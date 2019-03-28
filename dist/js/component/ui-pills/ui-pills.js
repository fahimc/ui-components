class UITags extends HTMLElement {
    static get observedAttributes() {
        return [];
    }
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();
        this.element.innerHTML = this.getTemplate();
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

            `;
    }
    getTemplate() {
        return `
            <slot></slot>
        `;
    }
}
customElements.define('ui-tags', UITags);
//# sourceMappingURL=ui-pills.js.map