class CoreComponent extends HTMLElement {
    public static get observedAttributes(): string[] {
        return ['style-path'];
    }
    public static UI_COMPONENT_STYLE_PATH = 'UI_COMPONENT_STYLE_PATH';
    private stylePath:string;
    constructor() {
        super();
        this.stylePath = 'css/ui-component.css';
        this.setPath(this.stylePath);
    }
    connectedCallback() {
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'style-path':
            this.setPath(newValue);
            break;
        }
    }
    setPath(value: string){
        (window as any)[CoreComponent.UI_COMPONENT_STYLE_PATH] = this.stylePath = value;
    }
}
customElements.define('ui-core', CoreComponent);