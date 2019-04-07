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
var UITags = (function (_super) {
    __extends(UITags, _super);
    function UITags() {
        var _this = _super.call(this) || this;
        _this.element = document.createElement('div');
        _this.styleElement = document.createElement('style');
        _this.styleElement.innerHTML = _this.getStyle();
        _this.tags = [];
        _this.element.innerHTML = _this.getTemplate();
        return _this;
    }
    Object.defineProperty(UITags, "observedAttributes", {
        get: function () {
            return ['tags'];
        },
        enumerable: true,
        configurable: true
    });
    UITags.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.styleElement.innerHTML = this.getStyle();
        this.element.classList.add('wrapper');
        this.render();
    };
    UITags.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
            case 'tags':
                this.tags = JSON.parse(newValue);
                break;
        }
        this.render();
    };
    UITags.prototype.getStyle = function () {
        return "\n        @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n        .tag {\n            border-radius: var(--tag-border-radius,0.2rem);\n            background-color: var(--tag-bg-color,#999);\n            color: var(--tag-color,white);\n            padding: var(--tag-padding,0.3rem 0.5rem);\n            margin-bottom: var(--tag-margin-bottom,0.2rem);\n            display: inline-block;\n            margin-right: var(--tag-margin-right,0.2rem);\n            font-size: var(--tag-font-size,0.75rem);\n            cursor:pointer;\n        }\n        .tag:not(.active):hover {\n            background-color: var(--tag-hover-bg-color,#666);\n        }\n        .tag.active {\n            background-color: var(--tag-active-bg-color,#333);\n            color: var(--tag-active-color,white);\n        }\n            ";
    };
    UITags.prototype.getTags = function () {
        var template = "";
        this.tags.forEach(function (tag, index) {
            template += "<div class=\"tag " + (tag.active ? 'active' : '') + "\" tag-id=\"" + index + "\">" + tag.name + "</div>";
        });
        return template;
    };
    UITags.prototype.getTemplate = function () {
        return "\n        " + this.getTags() + "\n        ";
    };
    UITags.prototype.onTagClicked = function (event) {
        var id = event.currentTarget.getAttribute('tag-id');
        var detail = {
            tabData: this.tags[Number(id)],
            eventType: event.srcElement.classList.contains('close') ? 'close' : 'active',
        };
        var e = new CustomEvent(UITags.EVENT.ON_TAG_CHANGE, {
            detail: detail,
        });
        this.dispatchEvent(e);
    };
    UITags.prototype.render = function () {
        var _this = this;
        this.element.innerHTML = this.getTemplate();
        this.element.querySelectorAll('.tag').forEach(function (element) {
            element.addEventListener('click', _this.onTagClicked.bind(_this));
        });
    };
    UITags.EVENT = {
        ON_TAG_CHANGE: 'ON_TAG_CHANGE',
    };
    return UITags;
}(HTMLElement));
customElements.define('ui-tags', UITags);
//# sourceMappingURL=ui-tags.js.map