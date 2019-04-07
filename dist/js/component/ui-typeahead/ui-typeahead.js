var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var TypeAHead = (function (_super) {
    __extends(TypeAHead, _super);
    function TypeAHead() {
        var _this = _super.call(this) || this;
        _this.optionList = [];
        _this.selectedList = [];
        _this.options = {
            menuHeight: '200px',
        };
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        _this.styleElement.innerHTML = _this.getStyle();
        _this.element.innerHTML = _this.getTemplate();
        return _this;
    }
    Object.defineProperty(TypeAHead, "observedAttributes", {
        get: function () {
            return ['option-list', 'selected-list', 'options'];
        },
        enumerable: true,
        configurable: true
    });
    TypeAHead.prototype.setList = function (value) {
        this.setProp('optionList', value);
    };
    TypeAHead.prototype.setSelected = function (value) {
        this.setProp('selectedList', value);
    };
    TypeAHead.prototype.setOptions = function (value) {
        this.setProp('options', value);
    };
    TypeAHead.prototype.setProp = function (prop, value) {
        if (!value)
            return;
        this[prop] = (typeof value == 'string') ? JSON.parse(value) : value;
        this.render();
    };
    TypeAHead.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = this.getStyle();
        this.element.classList.add('wrapper');
        this.element.innerHTML = this.getTemplate();
        this.render(true);
        this.element.addEventListener('click', this.onParentfocus.bind(this));
    };
    TypeAHead.prototype.render = function (isFirstTime) {
        var _this = this;
        if (!isFirstTime)
            this.dispatchOnChange();
        this.element.innerHTML = this.getTemplate();
        if (this.selectedList.length) {
            this.element.querySelector('.close').classList.add('show');
        }
        else {
            this.element.querySelector('.close').classList.remove('show');
        }
        this.element.querySelector('input').addEventListener('keyup', this.onInputKey.bind(this));
        this.element.querySelector('input').addEventListener('click', this.onInputKey.bind(this));
        this.element.querySelector('.close').addEventListener('click', this.onClearAllSelected.bind(this));
        this.element.querySelectorAll('.pill span').forEach(function (closeButton) { return closeButton.addEventListener('click', _this.onPillClick.bind(_this)); });
    };
    TypeAHead.prototype.onPillClick = function (event) {
        var index = event.currentTarget.getAttribute('pill-id');
        this.selectedList.splice(Number(index), 1);
        this.render();
    };
    TypeAHead.prototype.onClearAllSelected = function () {
        this.selectedList = [];
        this.render();
    };
    TypeAHead.prototype.onInputKey = function (event) {
        var value = event.currentTarget.value;
        var customEvent = new CustomEvent('OPEN_MENU', {
            detail: {
                items: this.getMenuItems(),
                relativeElement: this,
                options: {
                    height: this.options && this.options.menuHeight ? this.options.menuHeight : '',
                }
            }
        });
        document.body.dispatchEvent(customEvent);
    };
    TypeAHead.prototype.dispatchOnChange = function () {
        var customEvent = new CustomEvent(TypeAHead.EVENTS.ON_CHANGE, {
            detail: {
                selectedItems: this.selectedList.slice(),
            }
        });
        this.dispatchEvent(customEvent);
    };
    TypeAHead.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
            case 'option-list':
                this.setList(newValue);
                break;
            case 'selected-list':
                this.setSelected(newValue);
                break;
            case 'options':
                this.setOptions(newValue);
                break;
        }
    };
    TypeAHead.prototype.onParentfocus = function (event) {
        this.element.querySelector('input').focus();
    };
    TypeAHead.prototype.getStyle = function () {
        var margin = '5px';
        return "\n            @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n            ui-typeahead {\n                display:inline-block;\n            }\n            .wrapper {\n                display: flex;\n                border:1px solid #333;\n                flex-wrap: wrap;\n                position: relative;\n                padding-right: 1.5rem;\n                background-color: white;\n                background-color: var(--typeahead-bg-color,white);\n            }\n            .pill {\n                border-radius: 0.2rem;\n                border-radius: var(--pill-border-radius,0.2rem);\n                background-color: #999;\n                background-color: var(--pill-bg-color,#999);\n                color: white;\n                color: var(--pill-color,white);\n                padding: 0.3rem 0.5rem;\n                padding: var(--pill-padding,0.3rem 0.5rem);\n                margin-top: 0.2rem;\n                margin-top: var(--pill-margin-top,0.2rem);\n                margin-bottom: 0.2rem;\n                margin-bottom: var(--pill-margin-bottom,0.2rem);\n                margin-left: 0.2rem;\n                margin-left: var(--pill-margin-left,0.2rem);\n                display: inline-block;\n                margin-right: 0.2rem;\n                margin-right: var(--pill-margin-right,0.2rem);\n                font-size: 0.75rem;\n                font-size: var(--pill-font-size,0.75rem);\n                cursor:pointer;\n            }\n            .pill:not(.active):hover {\n                background-color: #666;\n                background-color: var(--pill-hover-bg-color,#666);\n            }\n            .pill.active {\n                background-color: #333;\n                background-color: var(--pill-active-bg-color,#333);\n                color: white;\n                color: var(--pill-active-color,white);\n            }\n            .pill span {\n                display: inline-block;\n                padding: 0 0.2rem;\n            }\n            input {\n                display: inline-block;\n                flex: 1;\n                border: none;\n                min-width:2rem;\n                margin:" + margin + ";\n            }\n            input:focus {\n                outline:none;\n            }\n            span.close {\n                position: absolute;\n                right: 0.5rem;\n                top: 50%;\n                transform: translateY(-50%);\n                font-size: 0.8rem;\n                font-weight: 700;\n                line-height: 1;\n                color: #333;\n                color: var(--typeahead-close-color,#333);\n                cursor: pointer;\n                display: none;\n            }\n            span.close:hover {\n                color: #999;\n                color: var(--typeahead-close-color,#999);\n            }\n            span.close.show {\n                display: block;\n            }\n            ";
    };
    TypeAHead.prototype.getMenuItems = function () {
        var _this = this;
        var value = this.element.querySelector('input').value.toLowerCase();
        var options = !value ? this.optionList
            .filter(function (item) { return !_this.selectedList.find(function (sItem) { return item.id == sItem.id; }); })
            : this.optionList.filter(function (item) { return !_this.selectedList.find(function (sItem) { return item.id == sItem.id; }) && item.label.toLowerCase().indexOf(value) >= 0; })
                .map(function (item) { return __assign({}, item, { label: item.label.replace(new RegExp("" + value, 'igm'), "<strong>" + value + "</strong>") }); });
        if (!options.length)
            options.push({
                label: 'No matches found.',
                id: 0,
            });
        return options.map(function (item) { return __assign({}, item, { callback: _this.onMenuItemClicked.bind(_this) }); });
    };
    TypeAHead.prototype.onMenuItemClicked = function (selectedItem) {
        this.selectedList.push(this.optionList.find(function (item) { return item.id == selectedItem.id; }));
        this.render();
        this.element.querySelector('input').focus();
    };
    TypeAHead.prototype.getPillTemplate = function (name, index) {
        return "\n            <div class=\"pill\">\n                " + name + "\n                <span pill-id=\"" + index + "\">x</span>\n            </div>\n        ";
    };
    TypeAHead.prototype.getPillList = function () {
        var _this = this;
        var template = "";
        this.selectedList.forEach(function (item, index) {
            template += _this.getPillTemplate(item.label, index);
        });
        return template;
    };
    TypeAHead.prototype.getTemplate = function () {
        return "\n            " + this.getPillList() + "\n            <input>\n            <span class=\"close\">x</span>\n        ";
    };
    TypeAHead.EVENTS = {
        ON_CHANGE: 'TYPEAHEAD_ON_CHANGE',
    };
    return TypeAHead;
}(HTMLElement));
customElements.define('ui-typeahead', TypeAHead);
//# sourceMappingURL=ui-typeahead.js.map