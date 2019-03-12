class UICol extends HTMLElement {
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
        this.element.classList.add('wrapper');
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
                box-sizing: border-box;
                flex: 1;
                vertical-align:top;
                display:inline-block;
                max-width:100%;
                width:100%;
                justify-content: flex-start;
                box-sizing: border-box;
                height:100%;
                padding:20px;
            }
            .wrapper{
                width:100%;
                height:100%;
            }
            .wrapper slot {
                flex:1;
            }
            @media(min-width: 815px) {
                :host([type="sx-3"]) {
                    flex-basis: 25%;
                    max-width: 25%;
                }
                :host([type="sx-9"]) {
                    flex-basis: 75%;
                    max-width: 75%;
                }
            }
            @media(max-width: 815px) {
            :host {
                flex-basis: 100%;
                height:auto;
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
customElements.define('ui-col', UICol);
//# sourceMappingURL=ui-col.js.map