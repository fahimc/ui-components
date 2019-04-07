var Main = {
    init: function(){
        document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
    },
    onLoad: function(){
        this.typeaheadExample();
        
    },
    typeaheadExample: function(){
        var typeahead = document.querySelectorAll('ui-typeahead');
        var typeaheadOptions = [
        ];
        for(var a=0; a < 20; ++a){
            typeaheadOptions.push({
                active: a == 0 ? true : false,
                label: this.createRandomWord(Math.floor(Math.random() * 6) + 4) + a + 1,
                id: a,
            });
        }
        typeahead.forEach(function(item) {
            item.setAttribute('option-list',JSON.stringify(typeaheadOptions))

            item.addEventListener('TYPEAHEAD_ON_CHANGE', function(event){
                console.log('TYPEAHEAD_ON_CHANGE', event);
            }.bind(this)); 
        }.bind(this));

        var customEvent = new CustomEvent('OPEN_MENU',{
            detail:{
                items: typeaheadOptions,
            }
        });
        
    },
    createRandomWord: function(length) {
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