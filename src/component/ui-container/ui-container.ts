class UIContainer extends HTMLElement {
    public static get observedAttributes(): string[] {
        return [];
    }
    private element: HTMLElement;
    private styleElement: HTMLStyleElement;
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);

        this.styleElement.innerHTML = this.getStyle();
        this.element.innerHTML = this.getTemplate();
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
        }
    }
    getStyle(){
        return `
            @import '${(window as any)['UI_COMPONENT_STYLE_PATH'] ? (window as any)['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
            :host{
                display:block;
                width:100%;
                height:100%;
                align-items: flex-start;
                justify-content: center;
            }
            @media(min-width: 1100px) {
            :host {
                max-width:var(--max-page-width,1135px);
                margin:auto;
            }
            }

            `;
    }
    getTemplate(){
        return `
            <slot></slot>
        `;
    }
}
customElements.define('ui-container',UIContainer)