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
var CoreComponent = (function (_super) {
    __extends(CoreComponent, _super);
    function CoreComponent() {
        var _this = _super.call(this) || this;
        _this.stylePath = 'css/ui-component.css';
        _this.setPath(_this.stylePath);
        return _this;
    }
    Object.defineProperty(CoreComponent, "observedAttributes", {
        get: function () {
            return ['style-path'];
        },
        enumerable: true,
        configurable: true
    });
    CoreComponent.prototype.connectedCallback = function () {
    };
    CoreComponent.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
            case 'style-path':
                this.setPath(newValue);
                break;
        }
    };
    CoreComponent.prototype.setPath = function (value) {
        window[CoreComponent.UI_COMPONENT_STYLE_PATH] = this.stylePath = value;
    };
    CoreComponent.UI_COMPONENT_STYLE_PATH = 'UI_COMPONENT_STYLE_PATH';
    return CoreComponent;
}(HTMLElement));
customElements.define('ui-core', CoreComponent);
//# sourceMappingURL=ui-core.js.map