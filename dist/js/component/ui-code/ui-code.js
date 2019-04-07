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
var UICode = (function (_super) {
    __extends(UICode, _super);
    function UICode() {
        var _this = _super.call(this) || this;
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        _this.content = '';
        document.addEventListener('DOMContentLoaded', _this.onLoaded.bind(_this));
        return _this;
    }
    Object.defineProperty(UICode, "observedAttributes", {
        get: function () {
            return ['code'];
        },
        enumerable: true,
        configurable: true
    });
    UICode.prototype.onLoaded = function () {
        if (this.innerHTML)
            this.content = this.innerHTML;
        this.convertCode();
    };
    UICode.prototype.connectedCallback = function () {
        if (this.innerHTML && this.innerHTML !== this.content) {
            this.content = this.innerHTML;
            this.convertCode();
        }
    };
    UICode.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
            case 'code':
                this.convertCode(newValue);
                break;
        }
    };
    UICode.prototype.convertCode = function (value) {
        var content = unescape(value ? value : this.content);
        content = content.replace(/<xmp>|<\/xmp>/igm, '');
        content = content.replace(/<pre>|<\/pre>/igm, '');
        content = content.replace(/<code>|<\/code>/igm, '');
        content = content.replace(/<(.*?)>/igm, '<span class="tag">&#x3C;$1&#x3E;</span>');
        content = content.replace(/(const |var |let |this\.|private |public |class | get | set | extends |super)/igm, '<span class="type">$1</span>');
        content = content.replace(/([a-zA-z]+)\(/igm, '<span class="method">$1</span>(');
        content = content.replace(/(^(?!\.)[a-zA-z]+)\./igm, '<span class="object">$1</span>.');
        content = content.replace(/([a-zA-z\-\(\)]+)\:/igm, '<span class="css-prop">$1</span>:');
        content = content.trim().replace(/\n|\r|\n\r/igm, '<br/>');
        content = content.replace(/(&#x3C;script)(.*?)(&#x3E;)/igm, '<span class="method">$1</span><span class="string">$2</span><span class="method">$3</span>');
        content = content.replace(/(&#x3C;\/script&#x3E;)/igm, '<span class="method">$1</span>');
        this.innerHTML = "\n        <style>" + this.getStyle() + "</style>\n        <div class=\"ui-code-wrapper\">\n            " + content + "\n        </div>\n       ";
    };
    UICode.prototype.getStyle = function () {
        return "\n            @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n            ui-code{\n                display:block;\n                width:100%;\n            }\n            .ui-code-wrapper {\n                font-family: \"Courier New\", Courier, monospace;\n                color:var(--color-secondary,white);\n                background-color:var(--bg-color-secondary,#0D0A0B);\n                padding:20px;\n                margin:20px 0;\n                width:100%;\n                display:block;\n                box-sizing: border-box;\n            } \n            .ui-code-wrapper .type, .ui-code-wrapper .tag {\n                 color:var(--code-blue,#63BFDB);\n             }\n             .ui-code-wrapper .method {\n                 color:var(--code-yellow,#FFBE0B);\n             }\n             .ui-code-wrapper .object {\n                 color:var(--code-green,#78BE20);\n             }\n             .ui-code-wrapper .string {\n                 color:var(--code-red,#F16F27);\n             }\n             .ui-code-wrapper .css-prop {\n                 color:var(--code-red,#F16F27);\n             }\n             \n             .ui-code-wrapper pre, .ui-code-wrapper xmp  {\n                 white-space:normal;\n             }\n            ";
    };
    UICode.prototype.getTemplate = function () {
        return "\n        <slot/>\n        ";
    };
    return UICode;
}(HTMLElement));
customElements.define('ui-code', UICode);
//# sourceMappingURL=ui-code.js.map