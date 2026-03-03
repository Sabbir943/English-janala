const createElement=(arr)=>{

  const htmlElement=arr.map(ele=>`<span class="btn">${ele}</span>`);
  return htmlElement.join(' ');
}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const loading=(status)=>{
    if(status){
        document.getElementById('loading').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    }
    else{
        document.getElementById('word-container').classList.remove('hidden')
        document.getElementById('loading').classList.add('hidden')
    }
}

const loadButton=()=>{
    const url="https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then((res)=>res.json())
    .then((all)=>displayData(all.data));
}
const removeActive=()=>{
    const removeActive=document.querySelectorAll(".lesson-btn");
    removeActive.forEach(btn=>btn.classList.remove('active'));
}
const loadWord=(id)=>{
    loading(true)
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        removeActive();
        const clickBtn=document.getElementById(`lesson-btn${id}`)
        clickBtn.classList.add('active');
        displayWord(data.data)
    }

);

}
const displayWord=(words)=>{
    const wordConatiner=document.getElementById('word-container');
    wordConatiner.innerHTML='';

    if(words.length==0){
        wordConatiner.innerHTML=`
        <div class=" col-span-full text-center space-y-3 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <h1 class="text-gray-400 font-bold  ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
            <p class="font-bold text-4xl">নেক্সট Lesson এ যান</p>
          </div>
        `
        loading(false);
        return;
    }
    words.forEach(word=>{
        const newCard=document.createElement('div');
        newCard.innerHTML=`
           <div class="bg-white py-10 px-5 text-center rounded-xl shadow-md space-y-4">
                <h1 class="font-bold text-2xl">${word.word?word.word:"পাওয়া যায় নি"}</h1>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <h1 class="font-bangla text-2xl">${word.meaning?word.meaning:"পাওয়া যায় নি"} /${word.pronunciation?word.pronunciation:"পাওয়া যায় নি"}</h1>
                 <div class="flex flex-row justify-between items-center">
                    <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-question"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                 </div>
            </div>
        `
        wordConatiner.append(newCard)
    })
    loading(false);
}
const displayData=(lesson)=>{
const levelContainer=document.getElementById('level-container');
levelContainer.innerHTML='';



lesson.forEach(lessons=>  {
    const newDiv=document.createElement('div');
    newDiv.innerHTML=`
    <button id="lesson-btn${lessons.level_no}" onclick="loadWord(${lessons.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open "></i>Lessons ${lessons.level_no}</button>
    `
    levelContainer.append(newDiv);
})
    
}

const loadWordDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    const res=await fetch(url);
    const details=await res.json();
    displayWordDetails(details.data);

}

const displayWordDetails=(word)=>{
    document.getElementById('my_modal_5').showModal();
    const detailsShow=document.getElementById('details-show');
    detailsShow.innerHTML=`
      <div class="space-y-3">
                      <h1 class="text-3xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>  :ইগার)</h1>
                <div class="space-y-2">
                    <p class="font-bold">Meaning</p>
                    <p class="font-bangla">${word.meaning}</p>

                </div>

                <div class="space-y-2">
                    <p class="font-bold"> Example</p>
                    <p>${word.sentence}</p>
                </div>

                <div class="">
                    <h1 class="font-bangla font-bold text-3xl">সমার্থক শব্দ গুলো</h1><br>
                   <div class="">
                   ${createElement(word.synonyms)}
                   </div>
                </div>
                </div>
    `
    
}

document.getElementById('search-btn')
.addEventListener('click',()=>{
    const getTextValue=document.getElementById('text-input').value.trim().toLowerCase();
    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res=>res.json())
    .then(data=>{
        const allWord=data.data;
        const filterWord=allWord.filter(word=>word.word.toLowerCase().includes(getTextValue));
        displayWord(filterWord);
    })
    
})

loadButton();
