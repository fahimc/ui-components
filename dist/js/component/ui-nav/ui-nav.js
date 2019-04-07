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
var UINav = (function (_super) {
    __extends(UINav, _super);
    function UINav() {
        var _this = _super.call(this) || this;
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        _this.styleElement.innerHTML = _this.getStyle();
        _this.element.classList.add('nav-wrapper');
        _this.element.innerHTML = _this.getTemplate();
        return _this;
    }
    Object.defineProperty(UINav, "observedAttributes", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    UINav.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = this.getStyle();
        this.element.innerHTML = this.getTemplate();
    };
    UINav.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
        }
    };
    UINav.prototype.getStyle = function () {
        return "\n            @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n            :host{\n                display:block;\n                width:100%;\n                position: fixed;\n            }\n            .nav-wrapper{\n                max-width:var(--max-page-width,1135px);\n                margin:auto;\n                background-color:var(--nav-background-color,#4f55c7);\n                padding:10px;\n                box-sizing: border-box;\n                color:var(--nav-color,white);\n            }\n            ";
    };
    UINav.prototype.getTemplate = function () {
        return "\n            <slot></slot>\n        ";
    };
    return UINav;
}(HTMLElement));
customElements.define('ui-nav', UINav);
//# sourceMappingURL=ui-nav.js.map