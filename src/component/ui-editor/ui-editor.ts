class UIEditor extends HTMLElement {
    public static get observedAttributes(): string[] {
        return [];
    }
    public static syntaxHighlighting = {
        'js':{
            types:['js'],
            keywords:[
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
            special:[
                'return',
                'if',
                'switch',
                'case',
            ],
            replace:[
                {
                    regex:'(?!\\.)([a-zA-Z0-9\\-\\_\\$]+[.])',
                    value: '<span class="type">$1</span>',
                },
                {
                    regex:'([\\w\\$\\-\\_]+)(?=\\()',
                    value: '<span class="method">$1</span>',
                },
            ]
        },
        'ts':{
            extends:['js'],
            keywords:[
                'private',
                'public'
            ],
        }
    };
    private syntax:string;
    private codeContent:string;
    private element: HTMLElement;
    private colored: HTMLElement
    private styleElement: HTMLStyleElement;
    constructor() {
        super();
        this.syntax = 'ts';
        this.codeContent = '';
        this.element = document.createElement('div');
        this.colored = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();

        this.element.innerHTML = this.getTemplate();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        shadow.appendChild(this.colored);

        this.styleElement.innerHTML = this.getStyle();
        this.colored.classList.add('code');
        this.element.classList.add('wrapper');
        this.element.setAttribute('contenteditable','true');
        this.element.innerHTML = this.getTemplate();
        this.element.addEventListener('keyup',this.onKeyUp.bind(this));
        this.element.addEventListener('mouseup',this.onKeyUp.bind(this));
        this.element.addEventListener('paste',this.onPaste.bind(this));
    }
    onPaste(event: any ){
        this.codeContent = (event.clipboardData || (window as any).clipboardData).getData('text');
        // this.codeContent = this.codeContent.replace(/\</gim,'&lt;');
        // this.codeContent = this.codeContent.replace(/\>/gim,'&gt;');
        // this.codeContent = this.codeContent.replace(/(.*?\n)/gim,'<div>$1&nbsp;</div>');
        //TODO need to make this work
        this.element.innerText = this.codeContent;
        event.preventDefault();
    }
    highlight(text?:string){
        Object.keys(UIEditor.syntaxHighlighting).forEach((key : string)=>{
            //TODO check extends objects
            if(key == this.syntax) {
                this.codeContent =  text ? text : this.element.innerText;
                // this.codeContent = this.codeContent.replace(/\</gim,'&lt;');
                // this.codeContent = this.codeContent.replace(/\>/gim,'&gt;');
                // this.codeContent = this.codeContent.replace(/\"/gim,'&quot;');
                console.log( this.codeContent);
                const item: any = (UIEditor.syntaxHighlighting as any)[key];
                this.applyHighlight(item);
                this.codeContent = this.codeContent.replace(/([\'"`].*?[\'"`])/gim,'|___string___|$1|__|');
                this.codeContent = this.codeContent.replace(/(.*?\n)/gim,'<div>$1&nbsp;</div>');
               this.codeContent = this.codeContent.replace(/\|___(.*?)___\|/gim,'<span class="$1">');
                this.codeContent = this.codeContent.replace(/\|__\|/gim,'</span>');
                this.colored.innerHTML = this.codeContent;
            }
        });
        
    }
    applyHighlight(item:any){
        let keywords = item.keywords;
        if(item.extends) {
            item.extends.forEach((t:any) => {this.applyHighlight((UIEditor.syntaxHighlighting as any)[t])});
        }
        const keywordsString = keywords.join('|');
        this.codeContent = this.codeContent.replace(new RegExp(`\\b(${keywordsString})(?=[^\\w])`,'igm'),'|___type___|$1</span>');
        
        if(item.replace){
            item.replace.forEach((r: any) => {
                this.codeContent = this.codeContent.replace(new RegExp(`(${r.regex})`,'igm'),r.value);
            });
        }
        if(item.special) {
            item.special.forEach((r: any) => {
                this.codeContent = this.codeContent.replace(new RegExp(`\\b(${r})(?=[^\\w])`,'igm'),'|___special___|$1</span>');
            });
        }
    }
    onKeyUp(event:KeyboardEvent){
       this.highlight();
       event.stopPropagation();
       event.preventDefault();
       return false;
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'syntax':
            this.syntax = newValue;
            break;
        }
    }
    getStyle() {
        return `
            @import '${(window as any)['UI_COMPONENT_STYLE_PATH'] ? (window as any)['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
            :host {
                width:100%;
                display:block;
                height:500px;
                background-color: var(--grey,#333);
                color: var(--white,white);
                position:relative;
                overflow:auto;
            }
            textarea {
                width:100%;
                height:100%;
                background-color: transparent;
                color: var(--white,white);
                display:block;
            }
            .wrapper {
                width:100%;
                height:100%;
                position:absolute;
                top:0;
                color: transparent;
                caret-color: white;
            }
            .code {
                width:100%;
                height:100%;
                pointer-events:none;
            }
            .html-tag{
                color:var(--code-blue,#63BFDB);
            } 
            .type{
                color:var(--code-blue,#63BFDB);
            } 
            .string, .string *{
                color:var(--code-red,#F16F27);
            }        
            .html-attr{
                color:var(--code-light-blue,#93BEBE);
            }    
            .method{
                color:var(--code-yellow,#FFBE0B);
            }
            .prop-type {
                color:var(--code-greenn,#78BE20);
            } 
            .special {
                color:var(--code-purple,#F16F27);
            } 
            `;
    }
    getTemplate() {
        return `
           
        `;
    }
}
customElements.define('ui-editor', UIEditor);