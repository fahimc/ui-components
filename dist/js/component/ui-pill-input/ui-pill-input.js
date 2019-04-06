class UIPillInput extends HTMLElement {
    static get observedAttributes() {
        return ['option-list', 'selected-list'];
    }
    constructor() {
        super();
        this.optionList = [];
        this.selectedList = [];
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();
        this.element.innerHTML = this.getTemplate();
    }
    setList(value) {
        this.setProp('optionList', value);
    }
    setSelected(value) {
        this.setProp('selectedList', value);
    }
    setProp(prop, value) {
        if (!value)
            return;
        this[prop] = (typeof value == 'string') ? JSON.parse(value) : value;
        this.render();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = this.getStyle();
        this.element.classList.add('wrapper');
        this.element.innerHTML = this.getTemplate();
        this.render();
        this.element.addEventListener('click', this.onParentfocus.bind(this));
    }
    render() {
        this.element.innerHTML = this.getTemplate();
        this.element.querySelector('input').addEventListener('keyup', this.onInputKey.bind(this));
        this.element.querySelectorAll('.pill span').forEach((closeButton) => closeButton.addEventListener('click', this.onPillClick.bind(this)));
    }
    onPillClick(event) {
        const index = event.currentTarget.getAttribute('pill-id');
        this.selectedList.splice(Number(index), 1);
        this.render();
    }
    onInputKey(event) {
        const value = event.currentTarget.value;
        const customEvent = new CustomEvent('OPEN_MENU', {
            detail: {
                items: this.getMenuItems(),
                relativeElement: this,
            }
        });
        document.body.dispatchEvent(customEvent);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'option-list':
                this.setList(newValue);
                break;
            case 'selected-list':
                this.setSelected(newValue);
                break;
        }
    }
    onParentfocus(event) {
        this.element.querySelector('input').focus();
    }
    getStyle() {
        const margin = '5px';
        return `
            @import '${window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
            .wrapper {
                display: flex;
                border:1px solid #333;
                flex-wrap: wrap;
            }
            .pill {
                border-radius: var(--pill-border-radius,0.2rem);
                background-color: var(--pill-bg-color,#999);
                color: var(--pill-color,white);
                padding: var(--pill-padding,0.3rem 0.5rem);
                margin-top: var(--pill-margin-top,0.2rem);
                margin-bottom: var(--pill-margin-bottom,0.2rem);
                margin-left: var(--pill-margin-left,0.2rem);
                display: inline-block;
                margin-right: var(--pill-margin-right,0.2rem);
                font-size: var(--pill-font-size,0.75rem);
                cursor:pointer;
            }
            .pill:not(.active):hover {
                background-color: var(--pill-hover-bg-color,#666);
            }
            .pill.active {
                background-color: var(--pill-active-bg-color,#333);
                color: var(--pill-active-color,white);
            }
            .pill span {
                display: inline-block;
                padding: 0 0.2rem;
            }
            input {
                display: inline-block;
                flex: 1;
                border: none;
                min-width:2rem;
                margin:${margin};
            }
            input:focus {
                outline:none;
            }
            `;
    }
    getMenuItems() {
        const value = this.element.querySelector('input').value.toLowerCase();
        let options = this.optionList
            .filter(item => !this.selectedList.find(sItem => item.id == sItem.id) && item.label.toLowerCase().indexOf(value) >= 0);
        if (!options.length)
            options.push({
                label: 'No matches found.',
                id: 0,
            });
        return options.map(item => { return Object.assign({}, item, { callback: this.onMenuItemClicked.bind(this) }); });
    }
    onMenuItemClicked(selectedItem) {
        this.selectedList.push(this.optionList.find(item => item.id == selectedItem.id));
        this.render();
        this.element.querySelector('input').focus();
    }
    getPillTemplate(name, index) {
        return `
            <div class="pill">
                ${name}
                <span pill-id="${index}">x</span>
            </div>
        `;
    }
    getPillList() {
        let template = ``;
        this.selectedList.forEach((item, index) => {
            template += this.getPillTemplate(item.label, index);
        });
        return template;
    }
    getTemplate() {
        return `
            ${this.getPillList()}
            <input>
        `;
    }
}
customElements.define('ui-pill-input', UIPillInput);
//# sourceMappingURL=ui-pill-input.js.map