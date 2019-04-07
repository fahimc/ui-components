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
var UIMarkdownPreview = (function (_super) {
    __extends(UIMarkdownPreview, _super);
    function UIMarkdownPreview() {
        var _this = _super.call(this) || this;
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        _this.content = '';
        document.addEventListener('DOMContentLoaded', _this.onLoaded.bind(_this));
        return _this;
    }
    Object.defineProperty(UIMarkdownPreview, "observedAttributes", {
        get: function () {
            return ['markdown'];
        },
        enumerable: true,
        configurable: true
    });
    UIMarkdownPreview.prototype.onLoaded = function () {
        if (this.innerHTML)
            this.content = this.innerHTML;
        this.convertCode();
    };
    UIMarkdownPreview.prototype.connectedCallback = function () {
        if (this.innerHTML && this.innerHTML !== this.content) {
            this.content = this.innerHTML;
            this.convertCode();
        }
    };
    UIMarkdownPreview.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
            case 'markdown':
                this.convertCode(newValue);
                break;
        }
    };
    UIMarkdownPreview.prototype.replaceList = function (tag, value) {
        var c = "<" + tag + ">" + value.replace(/([0-9]\.|\-|\*)(.*?)\n/g, "<li>$2</li>") + "</" + tag + ">";
        return c;
    };
    UIMarkdownPreview.prototype.convertCode = function (value) {
        var _this = this;
        var content = unescape(value ? value : this.content).trim();
        content += "\n";
        content = content.replace(/^&gt;(.*?)(?=(\n|  ))/igm, '<pre><code>$1</code></pre>');
        content = content.replace(/\#\#\#\#\#\#(.*?)(?=\n)/igm, '<h6>$1</h6>');
        content = content.replace(/\#\#\#\#\#(.*?)(?=\n)/igm, '<h5>$1</h5>');
        content = content.replace(/\#\#\#\#(.*?)(?=\n)/igm, '<h4>$1</h4>');
        content = content.replace(/\#\#\#(.*?)(?=\n)/igm, '<h3>$1</h3>');
        content = content.replace(/\#\#(.*?)(?=\n)/igm, '<h2>$1</h2>');
        content = content.replace(/\#(.*?)(?=\n)/igm, '<h1>$1</h1>');
        content = content.replace(/  /igm, '<br/>');
        content = content.replace(/\*\*(.*?)\*\*/igm, '<strong>$1</strong>');
        content = content.replace(/\*(.*?)\*/igm, '<em>$1</em>');
        content = content.replace(/(([0-9]\.(.*?)\n)+)/igm, function (v) { return _this.replaceList('ol', v); });
        content = content.replace(/^((\-(.*?)\n)+)/igm, function (v) { return _this.replaceList('ul', v); });
        content = content.replace(/((\*(.*?)\n)+)/igm, function (v) { return _this.replaceList('ul', v); });
        content = content.replace(/^(?!\<)(.*)\n/igm, '<p>$1</p>');
        content = content.replace(/\`(.*?)\`/igm, '<span class="code-line">$1</span>');
        content = content.replace(/\[(.*?)\]\((.*?)\)/igm, '<a href="$2">$1</a>');
        this.innerHTML = "\n        <style>" + this.getStyle() + "</style>\n        <div class=\"ui-markdown-preview\">\n            " + content + "\n        </div>\n       ";
    };
    UIMarkdownPreview.prototype.getStyle = function () {
        return "\n            @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n            :host{\n            }\n            .ui-markdown-preview {\n                font-family: Helvetica Neue,Helvetica,Arial,sans-serif; \n                color:var(--text-color-primary,#333);\n                padding:var(--component-padding,20px);\n                margin:var(--component-margin,20px);\n            } \n            \n             .ui-markdown-preview .code-line{\n                 color: var(--code-red,#F16F27);\n             }\n             \n             .ui-markdown-preview xmp  {\n                 white-space:normal;\n             }\n             .ui-markdown-preview h1 {\n                 border-bottom: 1px solid var(--color-grey-300,#ccc)\n             }\n             .ui-markdown-preview pre {\n                background-color: var(--color-grey-200,#e4e4e4);\n                padding: var(--component-item-padding,10px);\n             }\n             .ui-markdown-preview .code-line {\n                 font-family: \"Courier New\", Courier, monospace;\n             }\n            ";
    };
    UIMarkdownPreview.prototype.getTemplate = function () {
        return "\n        <slot/>\n        ";
    };
    return UIMarkdownPreview;
}(HTMLElement));
customElements.define('ui-markdown-preview', UIMarkdownPreview);
//# sourceMappingURL=ui-markdown-preview.js.map