class MenuComponent {
    constructor() {
        this.optionList = [];
        this.state = {
            isShowing: false,
            mouseX: 0,
            mouseY: 0,
        };
        this.options = {
            height: '100px',
        };
        this.resizeHandler = this.onResize.bind(this);
        this.openMenuHandler = this.openMenu.bind(this);
        this.menuClickedHandler = this.onMenuClicked.bind(this);
        this.mouseClickHandler = this.onMouseClick.bind(this);
        this.mouseMoveHandler = this.onMouseMove.bind(this);
        document.addEventListener('DOMContentLoaded', this.onDomLoaded.bind(this));
    }
    onDomLoaded() {
        this.createMenu();
    }
    createMenu() {
        let menu = document.querySelector(`#${MenuComponent.MENU_ID}`);
        if (!menu) {
            const styleElement = document.createElement('style');
            menu = document.createElement('div');
            menu.id = MenuComponent.MENU_ID;
            styleElement.innerHTML = this.getStyle();
            menu.innerHTML = this.getTemplate();
            document.body.appendChild(styleElement);
            document.body.appendChild(menu);
        }
        document.body.addEventListener(MenuComponent.EVENTS.OPEN_MENU, this.openMenuHandler);
        document.body.addEventListener('click', this.mouseClickHandler);
        document.body.addEventListener('mousemove', this.mouseMoveHandler);
    }
    onMouseMove(event) {
        if (event.pageX) {
            this.state.mouseX = event.pageX;
            this.state.mouseY = event.pageY;
        }
        else {
            this.state.mouseX = window.event.x + document.body.scrollLeft - 2;
            this.state.mouseY = window.event.y + document.body.scrollTop - 2;
        }
    }
    onMouseClick() {
        let menu = document.querySelector(`#${MenuComponent.MENU_ID}`);
        if (this.relativeElement && this.isMouseOutOfElement(menu) && this.isMouseOutOfElement(this.relativeElement) || !this.relativeElement && this.isMouseOutOfElement(menu)) {
            this.hideMenu();
        }
    }
    isMouseOutOfElement(element) {
        const rect = element.getBoundingClientRect();
        const offsetY = element.offsetTop;
        const offsetX = element.offsetLeft;
        return this.state.mouseX > (rect.width + offsetX) || this.state.mouseX < (offsetX) || this.state.mouseY > (rect.height + offsetY) || this.state.mouseY < (offsetY);
    }
    openMenu(event) {
        let menu = document.querySelector(`#${MenuComponent.MENU_ID}`);
        const detail = event.detail;
        this.options = {
            height: '',
        };
        if (menu && detail.items) {
            if (this.optionList !== detail.items) {
                this.optionList = detail.items;
                this.options = detail.options;
                this.relativeElement = detail.relativeElement;
                menu.querySelector('.ui-list-holder').innerHTML = this.getMenuList();
            }
            if (!menu.classList.contains('show')) {
                this.state.isShowing = true;
                menu.style.height = this.options && this.options.height ? this.options.height : '';
                menu.classList.add('show');
                menu.querySelector('.ui-list-holder').addEventListener('click', this.menuClickedHandler);
                window.addEventListener('resize', this.resizeHandler);
            }
            this.positionMenu();
        }
    }
    onMenuClicked(event) {
        const id = event.srcElement.getAttribute('option-list-id');
        const item = this.optionList.find(option => option.id == id);
        if (item) {
            if (item.callback)
                item.callback(item);
        }
        this.hideMenu();
    }
    hideMenu() {
        window.removeEventListener('resize', this.resizeHandler);
        this.reset();
        let menu = document.querySelector(`#${MenuComponent.MENU_ID}`);
        if (menu) {
            menu.querySelector('.ui-list-holder').removeEventListener('click', this.menuClickedHandler);
            menu.classList.remove('show');
        }
    }
    reset() {
        this.state.isShowing = false;
        this.relativeElement = null;
        this.optionList = [];
    }
    positionMenu() {
        let menu = document.querySelector(`#${MenuComponent.MENU_ID}`);
        if (menu && this.relativeElement) {
            const rect = this.relativeElement.getBoundingClientRect();
            const viewPortHeight = window.innerHeight;
            menu.style.width = rect.width + 'px';
            const menuRect = menu.getBoundingClientRect();
            menu.style.left = this.relativeElement.offsetLeft + 'px';
            if (rect.bottom + menuRect.height > viewPortHeight) {
                menu.style.top = (this.relativeElement.offsetTop - menuRect.height) + 'px';
            }
            else {
                menu.style.top = (this.relativeElement.offsetTop + rect.height) + 'px';
            }
        }
        else if (menu) {
            menu.style.top = this.state.mouseY + 'px';
            menu.style.left = this.state.mouseX + 'px';
        }
    }
    onResize() {
        if (this.state.isShowing) {
            this.positionMenu();
        }
    }
    getStyle() {
        return `
            #${MenuComponent.MENU_ID} {
                position:absolute;
                padding: var(--ui-menu-padding, 10px);
                border: 1px solid #333;
                display:none;
                box-sizing: border-box;
                background-color:var(--ui-menu-bg-color, white);
                z-index:99999;
                overflow:auto;
            }
            #${MenuComponent.MENU_ID}.show {
                display:block;
            }
            #${MenuComponent.MENU_ID} .ui-list-holder div {
                cursor: pointer;
            }
            #${MenuComponent.MENU_ID} .ui-list-holder div:hover {
                background-color: #ccc;
            }

            `;
    }
    getMenuList() {
        let template = ``;
        this.optionList
            .forEach((item, index) => {
            template += `
            <div option-list-id="${item.id !== undefined ? item.id : index}">
                ${item.label}
            </div>
            `;
        });
        return template;
    }
    getTemplate() {
        return `
            <div class="ui-list-holder">
            <div>
        `;
    }
}
MenuComponent.MENU_ID = 'ui-menu';
MenuComponent.EVENTS = {
    OPEN_MENU: 'OPEN_MENU'
};
window.UIComponents = Object.assign({}, window.UIComponents, { menuComponent: new MenuComponent() });
//# sourceMappingURL=ui-menu.js.map