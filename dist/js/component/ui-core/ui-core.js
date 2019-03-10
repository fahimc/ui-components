class CoreComponent extends HTMLElement {
    constructor() {
        super();
        this.stylePath = 'css/ui-component.css';
        this.setPath(this.stylePath);
    }
    static get observedAttributes() {
        return ['style-path'];
    }
    connectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'style-path':
                this.setPath(newValue);
                break;
        }
    }
    setPath(value) {
        window[CoreComponent.UI_COMPONENT_STYLE_PATH] = this.stylePath = value;
    }
}
CoreComponent.UI_COMPONENT_STYLE_PATH = 'UI_COMPONENT_STYLE_PATH';
customElements.define('ui-core', CoreComponent);
//# sourceMappingURL=ui-core.js.map