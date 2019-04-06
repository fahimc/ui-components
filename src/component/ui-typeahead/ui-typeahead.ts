interface TypeAHeadItem {
    label:string;
    id: string | number;
} 
interface TypeAHeadOptions {
    menuHeight:string;
}
class TypeAHead extends HTMLElement {
    public static get observedAttributes(): string[] {
        return ['option-list' ,'selected-list', 'options'];
    }
    private optionList: TypeAHeadItem[];
    private selectedList: TypeAHeadItem[];
    private options: TypeAHeadOptions;
    private element: HTMLElement;
    private styleElement: HTMLStyleElement;
    constructor() {
        super();
        this.optionList = [];
        this.selectedList = [];
        this.options = {
            menuHeight: '100px',
        }
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();

        this.element.innerHTML = this.getTemplate();
    }
    setList(value: any ){
        this.setProp('optionList',value);
    }
    setSelected(value: any ){
       this.setProp('selectedList',value);
    }
    setOptions(value: any ){
        this.setProp('options',value);
     }
    setProp(prop:string, value:any){
        if(!value) return;
        (this as any)[prop] = (typeof value == 'string') ?  JSON.parse(value): value;
        this.render();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);

        this.styleElement.innerHTML = this.getStyle();
        this.element.classList.add('wrapper');
        this.element.innerHTML = this.getTemplate();
        this.render();
        this.element.addEventListener('click',this.onParentfocus.bind(this))
    }

    render(){
        this.element.innerHTML = this.getTemplate();
        this.element.querySelector('input').addEventListener('keyup',this.onInputKey.bind(this));
        this.element.querySelectorAll('.pill span').forEach((closeButton)=>closeButton.addEventListener('click',this.onPillClick.bind(this)));
    }
    private onPillClick(event : MouseEvent){
        const index = (event.currentTarget as HTMLElement).getAttribute('pill-id');
        this.selectedList.splice(Number(index), 1);
        this.render();
    }
    onInputKey(event: KeyboardEvent){
        const value = (event.currentTarget as HTMLInputElement).value;
        const customEvent = new CustomEvent('OPEN_MENU',{
            detail:{
                items: this.getMenuItems(),
                relativeElement: this,
                options: {
                    height: this.options && this.options.menuHeight ? this.options.menuHeight : '',
                }
            }
        })
        document.body.dispatchEvent(customEvent);
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'option-list':
                this.setList(newValue);
            break;
            case 'selected-list':
                this.setSelected(newValue);
            break;
            case 'options':
                this.setOptions(newValue);
            break;
        }
    }
    onParentfocus(event: FocusEvent){
        this.element.querySelector('input').focus();
    }
    getStyle() {
        const margin = '5px';
        return `
            @import '${(window as any)['UI_COMPONENT_STYLE_PATH'] ? (window as any)['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
            .wrapper {
                display: flex;
                border:1px solid #333;
                flex-wrap: wrap;
            }
            .pill {
                border-radius: var(--pill-border-radius,0.2rem);
                background-color: var(--pill-bg-color,#999);
                color: var(--pill-color,white);
                padding: var(--pill-padding,0.3rem 0.5rem);
                margin-top: var(--pill-margin-top,0.2rem);
                margin-bottom: var(--pill-margin-bottom,0.2rem);
                margin-left: var(--pill-margin-left,0.2rem);
                display: inline-block;
                margin-right: var(--pill-margin-right,0.2rem);
                font-size: var(--pill-font-size,0.75rem);
                cursor:pointer;
            }
            .pill:not(.active):hover {
                background-color: var(--pill-hover-bg-color,#666);
            }
            .pill.active {
                background-color: var(--pill-active-bg-color,#333);
                color: var(--pill-active-color,white);
            }
            .pill span {
                display: inline-block;
                padding: 0 0.2rem;
            }
            input {
                display: inline-block;
                flex: 1;
                border: none;
                min-width:2rem;
                margin:${margin};
            }
            input:focus {
                outline:none;
            }
            `;
    }
    getMenuItems(): any[]{
        const value =  this.element.querySelector('input').value.toLowerCase();
        let options = this.optionList
        .filter(item=> !this.selectedList.find(sItem => item.id == sItem.id) && item.label.toLowerCase().indexOf(value) >= 0 );
        if(!options.length)options.push({
            label: 'No matches found.',
            id: 0,
        })
        return options.map(item => {return {...item, callback:this.onMenuItemClicked.bind(this)}});
    }
    onMenuItemClicked(selectedItem: TypeAHeadItem){
        this.selectedList.push(this.optionList.find(item => item.id == selectedItem.id));
        this.render();
        this.element.querySelector('input').focus();
    }
    getPillTemplate(name: string, index:number){
        return `
            <div class="pill">
                ${name}
                <span pill-id="${index}">x</span>
            </div>
        `;
    }
    getPillList(){
        let template = ``;
        this.selectedList.forEach((item, index)=>{
            template += this.getPillTemplate(item.label, index);
        });
        return template;
    }
    getTemplate() {
        return `
            ${this.getPillList()}
            <input>
        `;
    }
}
customElements.define('ui-typeahead', TypeAHead);