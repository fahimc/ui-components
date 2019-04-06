class UITags extends HTMLElement {
    public static EVENT = {
        ON_TAG_CHANGE:'ON_TAG_CHANGE',
    }
    public static get observedAttributes(): string[] {
        return ['tags'];
    }
    private element: HTMLElement;
    private styleElement: HTMLStyleElement;
    private tags:any[];
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();
        this.tags = [];
        this.element.innerHTML = this.getTemplate();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);

        this.styleElement.innerHTML = this.getStyle();
        this.element.classList.add('wrapper');

        this.render();
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'tags':
            this.tags = JSON.parse(newValue);
            break;
        }
        this.render();
    }
    getStyle() {
        return `
        @import '${(window as any)['UI_COMPONENT_STYLE_PATH'] ? (window as any)['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
        .tag {
            border-radius: var(--tag-border-radius,0.2rem);
            background-color: var(--tag-bg-color,#999);
            color: var(--tag-color,white);
            padding: var(--tag-padding,0.3rem 0.5rem);
            margin-bottom: var(--tag-margin-bottom,0.2rem);
            display: inline-block;
            margin-right: var(--tag-margin-right,0.2rem);
            font-size: var(--tag-font-size,0.75rem);
            cursor:pointer;
        }
        .tag:not(.active):hover {
            background-color: var(--tag-hover-bg-color,#666);
        }
        .tag.active {
            background-color: var(--tag-active-bg-color,#333);
            color: var(--tag-active-color,white);
        }
            `;
    }
    getTags(){
        let template:string = ``;
        this.tags.forEach((tag,index)=>{
            template += `<div class="tag ${tag.active ? 'active' : ''}" tag-id="${index}">${tag.name}</div>`;
        });

        return template;
    }
    getTemplate() {
        return `
        ${this.getTags()}
        `;
    }
    onTagClicked(event: MouseEvent){
        const id = (event.currentTarget as HTMLElement).getAttribute('tag-id');
        let detail: any = {
            tabData: this.tags[Number(id)],
            eventType: event.srcElement.classList.contains('close') ? 'close' : 'active',
        }
        const e: CustomEvent = new CustomEvent(UITags.EVENT.ON_TAG_CHANGE,{
            detail,
        });
        this.dispatchEvent(e);
    }
    render(){
        this.element.innerHTML = this.getTemplate();

        this.element.querySelectorAll('.tag').forEach((element: HTMLElement)=>{
            element.addEventListener('click', this.onTagClicked.bind(this));
        });
    }
}
customElements.define('ui-tags', UITags);