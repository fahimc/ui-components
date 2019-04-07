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
var UICol = (function (_super) {
    __extends(UICol, _super);
    function UICol() {
        var _this = _super.call(this) || this;
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        return _this;
    }
    Object.defineProperty(UICol, "observedAttributes", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    UICol.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = this.getStyle();
        this.element.classList.add('wrapper');
        this.element.innerHTML = this.getTemplate();
    };
    UICol.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
        }
    };
    UICol.prototype.getStyle = function () {
        return "\n            @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n            :host{\n                box-sizing: border-box;\n                flex: 1;\n                vertical-align:top;\n                display:inline-block;\n                max-width:100%;\n                width:100%;\n                justify-content: flex-start;\n                box-sizing: border-box;\n                height:100%;\n                padding:20px;\n            }\n            .wrapper{\n                width:100%;\n                height:100%;\n            }\n            .wrapper slot {\n                flex:1;\n            }\n            @media(min-width: 815px) {\n                :host([type=\"sx-3\"]) {\n                    flex-basis: 25%;\n                    max-width: 25%;\n                }\n                :host([type=\"sx-9\"]) {\n                    flex-basis: 75%;\n                    max-width: 75%;\n                }\n            }\n            @media(max-width: 815px) {\n            :host {\n                flex-basis: 100%;\n                height:auto;\n            }\n            }\n            ";
    };
    UICol.prototype.getTemplate = function () {
        return "\n            <slot></slot>\n        ";
    };
    return UICol;
}(HTMLElement));
customElements.define('ui-col', UICol);
//# sourceMappingURL=ui-col.js.map