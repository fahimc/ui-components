class UITabs extends HTMLElement {
    public static EVENT = {
        ON_TAB_CHANGE:'ON_TAB_CHANGE',
    }
    public static get observedAttributes(): string[] {
        return ['tabs'];
    }
    private element: HTMLElement;
    private styleElement: HTMLStyleElement;
    private tabs: any;
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();


        this.tabs = [];
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
            case 'tabs':
            this.tabs = JSON.parse(newValue);
            break;
        }
        this.render();
    }
    getStyle() {
        return `
            @import '${(window as any)['UI_COMPONENT_STYLE_PATH'] ? (window as any)['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
            :host {
                width: 100%;
            }
            .wrapper {
                overflow-x:auto;
                white-space: nowrap;
            }
            .wrapper::-webkit-scrollbar {
                width:var(--tab-scrollbar-width,0.5em);
            }
            .wrapper::-webkit-scrollbar-thumb {
                border-top: 1px solid black;
                background-color: var(--tab-scrollbar-thumb-bg,#333);
            }
            .wrapper::-webkit-scrollbar-track {
                background-color: var(--tab-scrollbar-track-bg,#666);
            }
            .tab {
                display: inline-block;
                padding: var(--tab-padding, 0.3rem 1rem);
                background-color: var(--tab-bg, #555);
                color: var(--tab-color, white);
                font-size: var(--tab-font-size,0.8rem);
                border-right: var(--tab-border-right,1px solid #111);
                box-sizing: border-box;
                position: relative;
                cursor:pointer;
            }
            .tab.active .close, .tab:hover .close{
                display:inline-block;
            }
            .close {
                display:none;
                font-size: 0.7rem;
                margin-left: 10px;
            }
            .tab.active {
                background-color: var(--tab-active-bg, #333);
                color: var(--tab-active-color, white);
            }
            .tab:not(.active):hover {
                background-color: var(--tab-hover-bg, #555);
                color: var(--tab-hover-color, white);
            }   
            `;
    }
    getTabElements(){
        let template = ``;
        this.tabs.forEach((tab: any, index:number) => {
            template += `<div class="tab ${tab.active ? 'active' : ''}" tab-id="${index}"><span>${tab.name}</span><span class="close">x</span></div>`;
        });
        return template;
    }
    getTemplate() {
        return `
            ${this.getTabElements()}
        `;
    }
    onTabClicked(event: MouseEvent){
        const id = (event.currentTarget as HTMLElement).getAttribute('tab-id');
        let detail: any = {
            tabData: this.tabs[id],
            eventType: event.srcElement.classList.contains('close') ? 'close' : 'active',
        }
        const e: CustomEvent = new CustomEvent(UITabs.EVENT.ON_TAB_CHANGE,{
            detail,
        });
        this.dispatchEvent(e);
    }
    render(){
        this.element.innerHTML = this.getTemplate();

        this.element.querySelectorAll('.tab').forEach((element: HTMLElement)=>{
            element.addEventListener('click', this.onTabClicked.bind(this));
        });
    }
}
customElements.define('ui-tabs', UITabs);