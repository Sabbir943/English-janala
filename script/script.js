

const loadButton=()=>{
    const url="https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then((res)=>res.json())
    .then((all)=>displayData(all.data));
}

const loadWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayWord(data.data))

}
const displayWord=(words)=>{
    const wordConatiner=document.getElementById('word-container');
    wordConatiner.innerHTML='';
    words.forEach(word=>{
        const newCard=document.createElement('div');
        newCard.innerHTML=`
           <div class="bg-white py-10 px-5 text-center rounded-xl shadow-md space-y-4">
                <h1 class="font-bold text-2xl">${word.word}</h1>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <h1 class="font-bangla text-2xl">${word.meaning} /${word.pronunciation}</h1>
                 <div class="flex flex-row justify-between items-center">
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-question"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                 </div>
            </div>
        `
        wordConatiner.append(newCard)
    })
}





const displayData=(lesson)=>{
const levelContainer=document.getElementById('level-container');
levelContainer.innerHTML='';



lesson.forEach(lessons=>  {
    const newDiv=document.createElement('div');
    newDiv.innerHTML=`
    <button onclick="loadWord(${lessons.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open"></i>Lessons ${lessons.level_no}</button>
    `
    levelContainer.append(newDiv);
})
    
}

loadButton();
