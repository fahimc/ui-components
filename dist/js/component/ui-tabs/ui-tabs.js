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
var UITabs = (function (_super) {
    __extends(UITabs, _super);
    function UITabs() {
        var _this = _super.call(this) || this;
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        _this.styleElement.innerHTML = _this.getStyle();
        _this.tabs = [];
        return _this;
    }
    Object.defineProperty(UITabs, "observedAttributes", {
        get: function () {
            return ['tabs'];
        },
        enumerable: true,
        configurable: true
    });
    UITabs.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = this.getStyle();
        this.element.classList.add('wrapper');
        this.render();
    };
    UITabs.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
            case 'tabs':
                this.tabs = JSON.parse(newValue);
                break;
        }
        this.render();
    };
    UITabs.prototype.getStyle = function () {
        return "\n            @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n            :host {\n                width: 100%;\n            }\n            .wrapper {\n                overflow-x:auto;\n                white-space: nowrap;\n            }\n            .wrapper::-webkit-scrollbar {\n                width:var(--tab-scrollbar-width,0.5rem);\n            }\n            .wrapper::-webkit-scrollbar-thumb {\n                border-top: 1px solid black;\n                background-color: var(--tab-scrollbar-thumb-bg,#333);\n            }\n            .wrapper::-webkit-scrollbar-track {\n                background-color: var(--tab-scrollbar-track-bg,#666);\n            }\n            .tab {\n                display: inline-block;\n                padding: var(--tab-padding, 0.3rem 1rem);\n                background-color: var(--tab-bg, #555);\n                color: var(--tab-color, white);\n                font-size: var(--tab-font-size,0.8rem);\n                border-right: var(--tab-border-right,1px solid #111);\n                box-sizing: border-box;\n                position: relative;\n                cursor:pointer;\n                max-width: var(--tab-max-width, 6rem);\n                text-overflow: ellipsis;\n                overflow:hidden;\n            }\n            .tab.active .close, .tab:hover .close{\n                display:inline-block;\n            }\n            .close {\n                display:none;\n                font-size: 0.7rem;\n                margin-left: 10px;\n            }\n            .tab.active {\n                background-color: var(--tab-active-bg, #333);\n                color: var(--tab-active-color, white);\n            }\n            .tab:not(.active):hover {\n                background-color: var(--tab-hover-bg, #555);\n                color: var(--tab-hover-color, white);\n            }   \n            ";
    };
    UITabs.prototype.getTabElements = function () {
        var template = "";
        this.tabs.forEach(function (tab, index) {
            template += "<div class=\"tab " + (tab.active ? 'active' : '') + "\" tab-id=\"" + index + "\"><span>" + tab.name + "</span><span class=\"close\">x</span></div>";
        });
        return template;
    };
    UITabs.prototype.getTemplate = function () {
        return "" + this.getTabElements();
    };
    UITabs.prototype.onTabClicked = function (event) {
        var id = event.currentTarget.getAttribute('tab-id');
        var detail = {
            tabData: this.tabs[id],
            eventType: event.srcElement.classList.contains('close') ? 'close' : 'active',
        };
        var e = new CustomEvent(UITabs.EVENT.ON_TAB_CHANGE, {
            detail: detail,
        });
        this.dispatchEvent(e);
    };
    UITabs.prototype.render = function () {
        var _this = this;
        this.element.innerHTML = this.getTemplate();
        this.element.querySelectorAll('.tab').forEach(function (element) {
            element.addEventListener('click', _this.onTabClicked.bind(_this));
        });
    };
    UITabs.EVENT = {
        ON_TAB_CHANGE: 'ON_TAB_CHANGE',
    };
    return UITabs;
}(HTMLElement));
customElements.define('ui-tabs', UITabs);
//# sourceMappingURL=ui-tabs.js.map