var Main = {
    init(){
        document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
    },
    onLoad(){
        this.tabExample();
        this.tagsExample();
        this.typeaheadExample();
        
    },
    typeaheadExample(){
        var typeahead = document.querySelectorAll('ui-typeahead');
        var typeaheadOptions = [
        ];
        for(var a=0; a < 20; ++a){
            typeaheadOptions.push({
                active: a == 0 ? true : false,
                label: `${this.createRandomWord(Math.floor(Math.random() * 6) + 4)} ${a + 1}`,
                id: a,
            });
        }
        typeahead.forEach(item => {
            item.setAttribute('option-list',JSON.stringify(typeaheadOptions))

            item.addEventListener('TYPEAHEAD_ON_CHANGE', (event)=>{
                console.log('TYPEAHEAD_ON_CHANGE', event);
            }); 
        });

        var customEvent = new CustomEvent('OPEN_MENU',{
            detail:{
                items: typeaheadOptions,
            }
        });

        // document.body.addEventListener('contextmenu',(event)=>{
        //     event.stopPropagation();
        //     event.preventDefault();
        //     document.body.dispatchEvent(customEvent);
        // });
        
    },
    tagsExample(){
        var tags = document.querySelector('ui-tags');
        var tagCollecton = [
        ];
        for(var a=0; a < 20; ++a){
            tagCollecton.push({
                active: a == 0 ? true : false,
                name: `tag ${a + 1}`,
                id: a,
            });
        }
        tags.setAttribute('tags',JSON.stringify(tagCollecton));
        
        var currentActiveIndex = 0;

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
        var tabs = document.querySelector('ui-tabs');
        var currentActiveIndex = 0;
        var tabCollecton = [
        ];
        for(var a=0; a < 20; ++a){
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
    },
    createRandomWord(length) {
        var consonants = 'bcdfghjlmnpqrstv',
            vowels = 'aeiou',
            rand = function(limit) {
                return Math.floor(Math.random()*limit);
            },
            i, word='', length = parseInt(length,10),
            consonants = consonants.split(''),
            vowels = vowels.split('');
        for (i=0;i<length/2;i++) {
            var randConsonant = consonants[rand(consonants.length)],
                randVowel = vowels[rand(vowels.length)];
            word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
            word += i*2<length-1 ? randVowel : '';
        }
        return word;
    }
}.init();