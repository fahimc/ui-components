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
var UIRow = (function (_super) {
    __extends(UIRow, _super);
    function UIRow() {
        var _this = _super.call(this) || this;
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        return _this;
    }
    Object.defineProperty(UIRow, "observedAttributes", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    UIRow.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = this.getStyle();
        this.element.classList.add('wrapper');
        this.element.innerHTML = this.getTemplate();
    };
    UIRow.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
        }
    };
    UIRow.prototype.getStyle = function () {
        return "\n            @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n            :host{\n                box-sizing: border-box;\n                display: flex;\n                flex: 1;\n                flex-direction: row;\n                flex-wrap: wrap;\n            }\n             .wrapper slot {\n                display: flex;\n                flex-direction: row;\n                justify-content: space-between;\n                width:100%;\n                height: 100%;\n                box-sizing: border-box;\n             }\n             ::slotted(ui-col) {\n                 flex:1;\n             }\n            .wrapper{\n                width:100%;\n                height:100%;\n                flex:1;\n                display:flex;\n            }\n            @media(max-width: 815px) {\n                .wrapper slot {\n                    flex-direction: column;\n                }\n            }\n            ";
    };
    UIRow.prototype.getTemplate = function () {
        return "\n            <slot></slot>\n        ";
    };
    return UIRow;
}(HTMLElement));
customElements.define('ui-row', UIRow);
//# sourceMappingURL=ui-row.js.map