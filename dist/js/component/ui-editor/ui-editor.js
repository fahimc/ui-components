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
var UIEditor = (function (_super) {
    __extends(UIEditor, _super);
    function UIEditor() {
        var _this = _super.call(this) || this;
        _this.syntax = 'ts';
        _this.codeContent = '';
        _this.element = document.createElement('div');
        _this.colored = document.createElement('div');
        _this.styleElement = document.createElement('style');
        _this.styleElement.innerHTML = _this.getStyle();
        _this.element.innerHTML = _this.getTemplate();
        return _this;
    }
    Object.defineProperty(UIEditor, "observedAttributes", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    UIEditor.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        shadow.appendChild(this.colored);
        this.styleElement.innerHTML = this.getStyle();
        this.colored.classList.add('code');
        this.element.classList.add('wrapper');
        this.element.setAttribute('contenteditable', 'true');
        this.element.innerHTML = this.getTemplate();
        this.element.addEventListener('keyup', this.onKeyUp.bind(this));
        this.element.addEventListener('mouseup', this.onKeyUp.bind(this));
        this.element.addEventListener('paste', this.onPaste.bind(this));
    };
    UIEditor.prototype.onPaste = function (event) {
        this.codeContent = (event.clipboardData || window.clipboardData).getData('text');
        this.element.innerText = this.codeContent;
        event.preventDefault();
    };
    UIEditor.prototype.highlight = function (text) {
        var _this = this;
        Object.keys(UIEditor.syntaxHighlighting).forEach(function (key) {
            if (key == _this.syntax) {
                _this.codeContent = text ? text : _this.element.innerText;
                console.log(_this.codeContent);
                var item = UIEditor.syntaxHighlighting[key];
                _this.applyHighlight(item);
                _this.codeContent = _this.codeContent.replace(/([\'"`].*?[\'"`])/gim, '|___string___|$1|__|');
                _this.codeContent = _this.codeContent.replace(/(.*?\n)/gim, '<div>$1&nbsp;</div>');
                _this.codeContent = _this.codeContent.replace(/\|___(.*?)___\|/gim, '<span class="$1">');
                _this.codeContent = _this.codeContent.replace(/\|__\|/gim, '</span>');
                _this.colored.innerHTML = _this.codeContent;
            }
        });
    };
    UIEditor.prototype.applyHighlight = function (item) {
        var _this = this;
        var keywords = item.keywords;
        if (item.extends) {
            item.extends.forEach(function (t) { _this.applyHighlight(UIEditor.syntaxHighlighting[t]); });
        }
        var keywordsString = keywords.join('|');
        this.codeContent = this.codeContent.replace(new RegExp("\\b(" + keywordsString + ")(?=[^\\w])", 'igm'), '|___type___|$1</span>');
        if (item.replace) {
            item.replace.forEach(function (r) {
                _this.codeContent = _this.codeContent.replace(new RegExp("(" + r.regex + ")", 'igm'), r.value);
            });
        }
        if (item.special) {
            item.special.forEach(function (r) {
                _this.codeContent = _this.codeContent.replace(new RegExp("\\b(" + r + ")(?=[^\\w])", 'igm'), '|___special___|$1</span>');
            });
        }
    };
    UIEditor.prototype.onKeyUp = function (event) {
        this.highlight();
        event.stopPropagation();
        event.preventDefault();
        return false;
    };
    UIEditor.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
            case 'syntax':
                this.syntax = newValue;
                break;
        }
    };
    UIEditor.prototype.getStyle = function () {
        return "\n            @import '" + (window['UI_COMPONENT_STYLE_PATH'] ? window['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css') + "';\n            :host {\n                width:100%;\n                display:block;\n                height:500px;\n                background-color: var(--grey,#333);\n                color: var(--white,white);\n                position:relative;\n                overflow:auto;\n            }\n            textarea {\n                width:100%;\n                height:100%;\n                background-color: transparent;\n                color: var(--white,white);\n                display:block;\n            }\n            .wrapper {\n                width:100%;\n                height:100%;\n                position:absolute;\n                top:0;\n                color: transparent;\n                caret-color: white;\n            }\n            .code {\n                width:100%;\n                height:100%;\n                pointer-events:none;\n            }\n            .html-tag{\n                color:var(--code-blue,#63BFDB);\n            } \n            .type{\n                color:var(--code-blue,#63BFDB);\n            } \n            .string, .string *{\n                color:var(--code-red,#F16F27);\n            }        \n            .html-attr{\n                color:var(--code-light-blue,#93BEBE);\n            }    \n            .method{\n                color:var(--code-yellow,#FFBE0B);\n            }\n            .prop-type {\n                color:var(--code-greenn,#78BE20);\n            } \n            .special {\n                color:var(--code-purple,#F16F27);\n            } \n            ";
    };
    UIEditor.prototype.getTemplate = function () {
        return "\n           \n        ";
    };
    UIEditor.syntaxHighlighting = {
        'js': {
            types: ['js'],
            keywords: [
                'static',
                'const',
                'var',
                'let',
                'this\\.',
                'class',
                'get',
                'set',
                'extends',
                '.super'
            ],
            special: [
                'return',
                'if',
                'switch',
                'case',
            ],
            replace: [
                {
                    regex: '(?!\\.)([a-zA-Z0-9\\-\\_\\$]+[.])',
                    value: '<span class="type">$1</span>',
                },
                {
                    regex: '([\\w\\$\\-\\_]+)(?=\\()',
                    value: '<span class="method">$1</span>',
                },
            ]
        },
        'ts': {
            extends: ['js'],
            keywords: [
                'private',
                'public'
            ],
        }
    };
    return UIEditor;
}(HTMLElement));
customElements.define('ui-editor', UIEditor);
//# sourceMappingURL=ui-editor.js.map