const Main = {
    init(){
        document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
    },
    onLoad(){
        this.tabExample();
        this.tagsExample();
        
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