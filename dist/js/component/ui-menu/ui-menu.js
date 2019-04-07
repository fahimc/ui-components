var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var MenuComponent = (function () {
    function MenuComponent() {
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
    MenuComponent.prototype.onDomLoaded = function () {
        this.createMenu();
    };
    MenuComponent.prototype.createMenu = function () {
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        if (!menu) {
            var styleElement = document.createElement('style');
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
    };
    MenuComponent.prototype.onMouseMove = function (event) {
        if (event.pageX) {
            this.state.mouseX = event.pageX;
            this.state.mouseY = event.pageY;
        }
        else {
            this.state.mouseX = window.event.x + document.body.scrollLeft - 2;
            this.state.mouseY = window.event.y + document.body.scrollTop - 2;
        }
    };
    MenuComponent.prototype.onMouseClick = function () {
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        if (this.relativeElement && this.isMouseOutOfElement(menu) && this.isMouseOutOfElement(this.relativeElement) || !this.relativeElement && this.isMouseOutOfElement(menu)) {
            this.hideMenu();
        }
    };
    MenuComponent.prototype.isMouseOutOfElement = function (element) {
        var rect = element.getBoundingClientRect();
        var offsetY = element.offsetTop;
        var offsetX = element.offsetLeft;
        return this.state.mouseX > (rect.width + offsetX) || this.state.mouseX < (offsetX) || this.state.mouseY > (rect.height + offsetY) || this.state.mouseY < (offsetY);
    };
    MenuComponent.prototype.openMenu = function (event) {
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        var detail = event.detail;
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
    };
    MenuComponent.prototype.onMenuClicked = function (event) {
        var id = event.srcElement.getAttribute('option-list-id');
        var item = this.optionList.find(function (option) { return option.id == id; });
        if (item) {
            if (item.callback)
                item.callback(item);
        }
        this.hideMenu();
    };
    MenuComponent.prototype.hideMenu = function () {
        window.removeEventListener('resize', this.resizeHandler);
        this.reset();
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        if (menu) {
            menu.querySelector('.ui-list-holder').removeEventListener('click', this.menuClickedHandler);
            menu.classList.remove('show');
        }
    };
    MenuComponent.prototype.reset = function () {
        this.state.isShowing = false;
        this.relativeElement = null;
        this.optionList = [];
    };
    MenuComponent.prototype.positionMenu = function () {
        var menu = document.querySelector("#" + MenuComponent.MENU_ID);
        if (menu && this.relativeElement) {
            var rect = this.relativeElement.getBoundingClientRect();
            var viewPortHeight = window.innerHeight;
            menu.style.width = rect.width + 'px';
            var menuRect = menu.getBoundingClientRect();
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
    };
    MenuComponent.prototype.onResize = function () {
        if (this.state.isShowing) {
            this.positionMenu();
        }
    };
    MenuComponent.prototype.getStyle = function () {
        return "\n            #" + MenuComponent.MENU_ID + " {\n                position:absolute;\n                padding: 10px;\n                padding: var(--ui-menu-padding, 10px);\n                border: 1px solid #333;\n                display:none;\n                box-sizing: border-box;\n                background-color:white;\n                background-color:var(--ui-menu-bg-color, white);\n                z-index:99999;\n                overflow:auto;\n            }\n            #" + MenuComponent.MENU_ID + ".show {\n                display:block;\n            }\n            #" + MenuComponent.MENU_ID + " .ui-list-holder div {\n                cursor: pointer;\n            }\n            #" + MenuComponent.MENU_ID + " .ui-list-holder div:hover {\n                background-color: #ccc;\n            }\n\n            ";
    };
    MenuComponent.prototype.getMenuList = function () {
        var template = "";
        this.optionList
            .forEach(function (item, index) {
            template += "\n            <div option-list-id=\"" + (item.id !== undefined ? item.id : index) + "\">\n                " + item.label + "\n            </div>\n            ";
        });
        return template;
    };
    MenuComponent.prototype.getTemplate = function () {
        return "\n            <div class=\"ui-list-holder\">\n            <div>\n        ";
    };
    MenuComponent.MENU_ID = 'ui-menu';
    MenuComponent.EVENTS = {
        OPEN_MENU: 'OPEN_MENU'
    };
    return MenuComponent;
}());
window.UIComponents = __assign({}, window.UIComponents, { menuComponent: new MenuComponent() });
//# sourceMappingURL=ui-menu.js.map