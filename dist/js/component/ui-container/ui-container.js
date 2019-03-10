class UIContainer extends HTMLElement {
    static get observedAttributes() {
        return [];
    }
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
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
        }
    }
    getStyle() {
        return `
            @import '${window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
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
    getTemplate() {
        return `
            <slot></slot>
        `;
    }
}
customElements.define('ui-container', UIContainer);
//# sourceMappingURL=ui-container.js.map