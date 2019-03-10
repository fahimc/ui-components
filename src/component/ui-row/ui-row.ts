class UIRow extends HTMLElement {
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
    getStyle() {
        return `
            @import '${(window as any)['UI_COMPONENT_STYLE_PATH'] ? (window as any)['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
            :host{
                box-sizing: border-box;
                display: flex;
                flex: 1;
                flex-direction: row;
                flex-wrap: wrap;
               justify-content: space-between;
            }
            ::slotted(ui-col:last-child){
                margin-left:-15px;
                padding-left:15px;
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