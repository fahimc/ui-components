class UITags extends HTMLElement {
    static get observedAttributes() {
        return ['tags'];
    }
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();
        this.tags = [];
        this.element.innerHTML = this.getTemplate();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = this.getStyle();
        this.element.classList.add('wrapper');
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'tags':
                this.tags = JSON.parse(newValue);
                break;
        }
        this.render();
    }
    getStyle() {
        return `
        @import '${window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
        .tag {
            border-radius: var(--tag-border-radius,0.2rem);
            background-color: var(--tag-bg-color,#999);
            color: var(--tag-color,white);
            padding: var(--tag-padding,0.3rem 0.5rem);
            margin-bottom: var(--tag-margin-bottom,0.2rem);
            display: inline-block;
            margin-right: var(--tag-margin-right,0.2rem);
            font-size: var(--tag-font-size,0.75rem);
        }
            `;
    }
    getTags() {
        let template = ``;
        this.tags.forEach((tag, index) => {
            template += `<div class="tag" tag-id="${index}">${tag.name}</div>`;
        });
        return template;
    }
    getTemplate() {
        return `
        ${this.getTags()}
        `;
    }
    render() {
        this.element.innerHTML = this.getTemplate();
    }
}
customElements.define('ui-tags', UITags);
//# sourceMappingURL=ui-tags.js.map