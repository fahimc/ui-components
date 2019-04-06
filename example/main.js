const Main = {
    init(){
        document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
    },
    onLoad(){
        this.tabExample();
        this.tagsExample();
        this.typeaheadExample();
        
    },
    typeaheadExample(){
        const tags = document.querySelectorAll('ui-typeahead');
        let tagCollecton = [
        ];
        for(let a=0; a < 20; ++a){
            tagCollecton.push({
                active: a == 0 ? true : false,
                label: `pill ${a + 1}`,
                id: a,
            });
        }
        tags.forEach(tag => tag.setAttribute('option-list',JSON.stringify(tagCollecton)));

        const customEvent = new CustomEvent('OPEN_MENU',{
            detail:{
                items: tagCollecton,
            }
        });

        document.body.addEventListener('contextmenu',(event)=>{
            event.stopPropagation();
            event.preventDefault();
            document.body.dispatchEvent(customEvent);
        });
        
    },
    tagsExample(){
        const tags = document.querySelector('ui-tags');
        let tagCollecton = [
        ];
        for(let a=0; a < 20; ++a){
            tagCollecton.push({
                active: a == 0 ? true : false,
                name: `tag ${a + 1}`,
                id: a,
            });
        }
        tags.setAttribute('tags',JSON.stringify(tagCollecton));
        
        let currentActiveIndex = 0;

        tags.addEventListener(UITags.EVENT.ON_TAG_CHANGE, (event)=>{
            console.log('tag clicked', event.detail);
            tagCollecton.forEach((item , index) =>{
                if(item.id == event.detail.tabData.id) {
                    tagCollecton[currentActiveIndex].active = false;
                    item.active = true;
                    currentActiveIndex = index;
                }
                
            });
            tags.setAttribute('tags',JSON.stringify(tagCollecton));
        });

    },
    tabExample(){
        const tabs = document.querySelector('ui-tabs');
        let currentActiveIndex = 0;
        let tabCollecton = [
        ];
        for(let a=0; a < 20; ++a){
            tabCollecton.push({
                active: a == 0 ? true : false,
                name: `tab ${a + 1}`,
                id: a,
            });
        }
        tabs.setAttribute('tabs',JSON.stringify(tabCollecton));
        tabs.addEventListener(UITabs.EVENT.ON_TAB_CHANGE, (event)=>{
            console.log('tab clicked', event.detail)
            if(event.detail.eventType == 'active'){
                tabCollecton.forEach((item , index) =>{
                    if(item.id == event.detail.tabData.id) {
                        tabCollecton[currentActiveIndex].active = false;
                        item.active = true;
                        currentActiveIndex = index;
                    }
                    
                });
            }else if(event.detail.eventType == 'close'){
                tabCollecton.forEach((item , index) =>{
                    if(item.id == event.detail.tabData.id) {
                        tabCollecton[currentActiveIndex].active = false;
                        tabCollecton.splice(index,1);
                        currentActiveIndex = 0;
                        if(tabCollecton[0])tabCollecton[0].active = true;
                    }
                    
                });
            }
            tabs.setAttribute('tabs',JSON.stringify(tabCollecton));

        });
    }
}.init();