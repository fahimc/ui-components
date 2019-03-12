class UIRow extends HTMLElement {
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
                display: flex;
                flex: 1;
                flex-direction: row;
                flex-wrap: wrap;
            }
             .wrapper slot {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width:100%;
             }
             ::slotted(ui-col) {
                 flex:1;
             }
            .wrapper{
                width:100%;
                height:100%;
                flex:1;
                display:flex;
            }
            @media(max-width: 815px) {
                .wrapper slot {
                    flex-direction: column;
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
customElements.define('ui-row', UIRow);
//# sourceMappingURL=ui-row.js.map