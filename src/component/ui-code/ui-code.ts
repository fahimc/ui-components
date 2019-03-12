class UICode extends HTMLElement {
    public static get observedAttributes(): string[] {
        return ['code'];
    }
    private element: HTMLElement;
    private styleElement: HTMLStyleElement;
    private content:string;
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.content = '';
        document.addEventListener('DOMContentLoaded', this.onLoaded.bind(this));
    }
    onLoaded(){
        if (this.innerHTML)this.content = this.innerHTML;
        this.convertCode();
    }
    connectedCallback() {
        if(this.innerHTML && this.innerHTML !== this.content) {
            this.content = this.innerHTML;
            this.convertCode();
        }
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'code':
            this.convertCode(newValue);
            break;
        }
    }
    convertCode(value?:string){
        let content = unescape(value ? value : this.content);
        content = content.replace(/<xmp>|<\/xmp>/igm,'');
        content = content.replace(/<pre>|<\/pre>/igm,'');
        content = content.replace(/<code>|<\/code>/igm,'');
        content = content.replace(/<(.*?)>/igm,'<span class="tag">&#x3C;$1&#x3E;</span>');
        content = content.replace(/(const |var |let |this\.|private |public |class | get | set | extends |super)/igm,'<span class="type">$1</span>');
        content = content.replace(/([a-zA-z]+)\(/igm,'<span class="method">$1</span>(');
        content = content.replace(/(^(?!\.)[a-zA-z]+)\./igm,'<span class="object">$1</span>.');
        content = content.replace(/([a-zA-z\-]+)\:/igm,'<span class="css-prop">$1</span>:');
        content = content.trim().replace(/\n|\r|\n\r/igm,'<br/>');
        content = content.replace(/(&#x3C;script)(.*?)(&#x3E;)/igm,'<span class="method">$1</span><span class="string">$2</span><span class="method">$3</span>');
        content = content.replace(/(&#x3C;\/script&#x3E;)/igm, '<span class="method">$1</span>');

       this.innerHTML = `
        <style>${this.getStyle()}</style>
        <div class="ui-code-wrapper">
            ${content}
        </div>
       `;
    }
    getStyle() {
        return `
            @import '${(window as any)['UI_COMPONENT_STYLE_PATH'] ? (window as any)['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
            ui-code{
                display:block;
                width:100%;
            }
            .ui-code-wrapper {
                font-family: "Courier New", Courier, monospace;
                color:var(--color-secondary,white);
                background-color:var(--bg-color-secondary,#0D0A0B);
                padding:20px;
                margin:20px 0;
                width:100%;
                display:block;
                box-sizing: border-box;
            } 
            .ui-code-wrapper .type, .ui-code-wrapper .tag {
                 color:var(--code-blue,#63BFDB);
             }
             .ui-code-wrapper .method {
                 color:var(--code-yellow,#FFBE0B);
             }
             .ui-code-wrapper .object {
                 color:var(--code-green,#78BE20);
             }
             .ui-code-wrapper .string {
                 color:var(--code-red,#F16F27);
             }
             .ui-code-wrapper .css-prop {
                 color:var(--code-red,#F16F27);
             }
             
             .ui-code-wrapper pre, .ui-code-wrapper xmp  {
                 white-space:normal;
             }
            `;
    }
    getTemplate() {
        return `
        <slot/>
        `;
    }
}
customElements.define('ui-code', UICode);