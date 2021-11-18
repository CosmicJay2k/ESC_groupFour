import {showOnlineCards, showOnsiteCards} from "./filterByType.js";

const tagStorageArray = []
//Factory function, creates an tag(label) obj
function createTagObj(tagName){
    return{
        tagName: tagName,
        active: false,
        setToActive: function(){
            this.active === false ? 
            this.active = true : 
            this.active = false;
        }
    }
}


//fetch the index of an tagObj if the tabBtn has the same name.
function getObjIndex(tagBtnText){
    let indexOfTag = 0;
    for (const tag of tagStorageArray) {
        if (tagBtnText === tag.tagName) 
        indexOfTag = tagStorageArray.indexOf(tag) ;
    }
    return indexOfTag;
}

/* ========================= main function ==================================*/
//creates dynamic addEventListener on TagBtn, if the labels(tags) change
export default function filterByTag(){
    const byTagBtns = document.querySelectorAll('.filter-byTag-container button');
    
    byTagBtns.forEach(tagBtn =>{
        tagStorageArray.push(createTagObj(tagBtn.innerText));
        tagBtn.addEventListener('click', () => {
            displayCardWithTag(tagBtn, getObjIndex(tagBtn.innerText));
            displayCardsForActiveTags();
        })
    })
};

//
function displayCardWithTag(tagBtn, tagObjIndex){
    if(tagBtn.style.backgroundColor !== 'lightgray') 
        tagBtn.style.backgroundColor = 'lightgray';
    else {
        tagBtn.style.backgroundColor = 'white';
        CardTagNameRemove(tagBtn);
    }
    tagStorageArray[tagObjIndex].setToActive();
}

//displays all cards and re-filters them on change
function CardTagNameRemove(){
    const cards = document.querySelectorAll('.card');
    const cbOnline = document.querySelector("#filter-checkbox-online");
    const cbOnsite = document.querySelector("#filter-checkbox-onsite");
   
    cards.forEach( card => {
        card.style.display = 'flex';
        card.style.backgroundColor = 'white';
    })

    if(cbOnline.checked == false) showOnlineCards();
    if(cbOnsite.checked == false) showOnsiteCards();
}

//displays card if the tag(label) is ative
function displayCardsForActiveTags(){
    const aktiveTags = pushActiveTagsToArray();
    aktiveTags.forEach(index =>{
        findByCardTagName(index)
    })
} 


//looking at the tagStorage for of tabObj.active == true
function checkTotalAtkiveTags(){
    let totalAktiveTags = 0
    for (const tagObj of tagStorageArray){
        if(tagObj.aktive == true) totalAktiveTags++;
    }
    return totalAktiveTags;
}

//stores all aktive tags in an new array
function pushActiveTagsToArray(){
    let totalAktiveTags = checkTotalAtkiveTags();
    const aktivTagsArray = [];
    if(totalAktiveTags > 0){
        for (const tagObj of tagStorageArray){
            if(tagObj.aktive == true) aktivTagsArray.push(tagObj.tagName);
        }
    }
    return aktivTagsArray;
}


//finds card with matching challenges classList.value 
function findByCardTagName(tagIndex){
    const cards = document.querySelectorAll('.card');
    cards.forEach( card => {
        if(card.style.display === 'none') return //om ett kort har display: none; returnera inget annars fortsätt
        let newRegEx = new RegExp(`${tagIndex}`); //kollar på classlist.value som är en sträng av alla klasser.
        if(!newRegEx.test(card.classList.value)){
            card.style.display = 'none';
        }
    })
}


