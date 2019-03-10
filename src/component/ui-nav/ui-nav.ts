class UINav extends HTMLElement {
    public static get observedAttributes(): string[] {
        return [];
    }
    private element: HTMLElement;
    private styleElement: HTMLStyleElement;
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();

        this.element.classList.add('nav-wrapper');
        this.element.innerHTML = this.getTemplate();
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
    getStyle() {
        return `
            @import '${(window as any)['UI_COMPONENT_STYLE_PATH'] ? (window as any)['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
            :host{
                display:block;
                width:100%;
                position: fixed;
            }
            .nav-wrapper{
                max-width:var(--max-page-width,1135px);
                margin:auto;
                background-color:var(--nav-background-color,#4f55c7);
                padding:10px;
                box-sizing: border-box;
                color:var(--nav-color,white);
            }
            `;
    }
    getTemplate() {
        return `
            <slot></slot>
        `;
    }
}
customElements.define('ui-nav', UINav);