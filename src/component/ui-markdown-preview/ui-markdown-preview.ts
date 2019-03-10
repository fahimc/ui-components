class UIMarkdownPreview extends HTMLElement {
    public static get observedAttributes(): string[] {
        return ['markdown'];
    }
    private element: HTMLElement;
    private styleElement: HTMLStyleElement;
    private content: string;
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.content = '';
        document.addEventListener('DOMContentLoaded', this.onLoaded.bind(this));
    }
    onLoaded() {
        if (this.innerHTML) this.content = this.innerHTML;
        this.convertCode();
    }
    connectedCallback() {
        if (this.innerHTML && this.innerHTML !== this.content) {
            this.content = this.innerHTML;
            this.convertCode();
        }
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'markdown':
                this.convertCode(newValue);
                break;
        }
    }
    replaceList(tag:string,value:string) : string{
        let c = `<${tag}>${value.replace(/([0-9]\.|\-|\*)(.*?)\n/g, `<li>$2</li>`)}</${tag}>`;
        return c;
    }
    convertCode(value?: string) {
        let content = unescape(value ? value : this.content).trim();
        content += `\n`;
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
        content = content.replace(/(([0-9]\.(.*?)\n)+)/igm, (v: string) => this.replaceList('ol',v));
        content = content.replace(/^((\-(.*?)\n)+)/igm, (v: string) => this.replaceList('ul',v));
        content = content.replace(/((\*(.*?)\n)+)/igm, (v: string) => this.replaceList('ul',v));
        // content = content.replace(/\`\`\`((.|\n)*)\`\`\`/igm, '<xmp>$1</xmp>');
        content = content.replace(/^(?!\<)(.*)\n/igm, '<p>$1</p>');
        content = content.replace(/\`(.*?)\`/igm, '<span class="code-line">$1</span>');
        content = content.replace(/\[(.*?)\]\((.*?)\)/igm, '<a href="$2">$1</a>');

        this.innerHTML = `
        <style>${this.getStyle()}</style>
        <div class="ui-markdown-preview">
            ${content}
        </div>
       `;
    }
    getStyle() {
        return `
            @import '${(window as any)['UI_COMPONENT_STYLE_PATH'] ? (window as any)['UI_COMPONENT_STYLE_PATH'] : 'css/ui-component.css'}';
            :host{
            }
            .ui-markdown-preview {
                font-family: Helvetica Neue,Helvetica,Arial,sans-serif; 
                color:var(--text-color-primary,#333);
                padding:var(--component-padding,20px);
                margin:var(--component-margin,20px);
            } 
            
             .ui-markdown-preview .code-line{
                 color: var(--code-red,#F16F27);
             }
             
             .ui-markdown-preview xmp  {
                 white-space:normal;
             }
             .ui-markdown-preview h1 {
                 border-bottom: 1px solid var(--color-grey-300,#ccc)
             }
             .ui-markdown-preview pre {
                background-color: var(--color-grey-200,#e4e4e4);
                padding: var(--component-item-padding,10px);
             }
             .ui-markdown-preview .code-line {
                 font-family: "Courier New", Courier, monospace;
             }
            `;
    }
    getTemplate() {
        return `
        <slot/>
        `;
    }
}
customElements.define('ui-markdown-preview', UIMarkdownPreview);