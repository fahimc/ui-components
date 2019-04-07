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
var UIContainer = (function (_super) {
    __extends(UIContainer, _super);
    function UIContainer() {
        var _this = _super.call(this) || this;
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        return _this;
    }
    Object.defineProperty(UIContainer, "observedAttributes", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    UIContainer.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = this.getStyle();
        this.element.innerHTML = this.getTemplate();
    };
    UIContainer.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
        }
    };
    UIContainer.prototype.getStyle = function () {
        return "\n            @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n            :host{\n                display:block;\n                width:100%;\n                height:100%;\n                align-items: flex-start;\n                justify-content: center;\n            }\n            @media(min-width: 1100px) {\n            :host {\n                max-width:var(--max-page-width,1135px);\n                margin:auto;\n            }\n            }\n\n            ";
    };
    UIContainer.prototype.getTemplate = function () {
        return "\n            <slot></slot>\n        ";
    };
    return UIContainer;
}(HTMLElement));
customElements.define('ui-container', UIContainer);
//# sourceMappingURL=ui-container.js.map