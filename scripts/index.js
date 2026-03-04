//11 for synonyms
const createElement = (arr) =>{
    const htmlElement = arr.map((el) => `<span class = "btn">${el}</span>`);
    return(htmlElement.join(" "));

}

// 1
const loadLessons = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then((json)=> displayLessons(json.data));
};



// 7
const removeActive = () =>{
    const lessonBtn = document.querySelectorAll('.lesson-btn');

    lessonBtn.forEach(btn => btn.classList.remove("active"));

}


// 3
const loadLevelWord = (id) =>{
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    
    fetch(url)
    .then(res => res.json())
    // 6
    .then((data) =>{
        removeActive();  // will remove active class from all the buttons
        const clickedBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickedBtn);
        clickedBtn.classList.add("active"); //will add active class just to the selected button


        displayLevelWord(data.data);
        
    } );
}


//9
const loadWordDetail = async(id)  =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);

}


//10
const displayWordDetails = (word) =>{
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML= `<div class="">
        <h2 class="text-2xl font bold">${word.word} (<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h2>
    </div> 

    <div class="">
        <h2 class="font bold">${word.meaning}</h2>
        <p>আগ্রহী</p>
    </div> 

    <div class="">
        <h2 class="font bold">example</h2>
        <p>${word.sentence}</p>
    </div>

    <div class="">
        <h2 class="font bold">synonym</h2>
        <div class = "">${createElement(word.synonyms)}</div>
    </div>`;

    document.getElementById("my_modal_5").showModal();
    

}


// 4
const displayLevelWord = (words) =>{

    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";


    // 5 this is for when there is no word in that level

    if(words.length ==0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
            <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="text-xl font-medium text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
    }

    words.forEach((word) => {
        const card = document.createElement('div');

        // 6 for null values conditinal rendaring
        //8 my_modal_5.showModal() is the modal info
        card.innerHTML = `
           <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold ">Meaning / pronumciation</p>
            <div class="font-bangla text-2xl font-medium text-gray-700">"${word.meaning? word.meaning : "অর্থ পাওয়া যায়নি" } / ${word.pronunciation? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">

             
                <button onclick ="loadWordDetail(${word.id })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        
        `;

        wordContainer.append(card);
        
    });

}


// 2
const displayLessons = (lessons) =>{
    // 1.get the container and empty it

    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2. get into every lesson
    for(let lesson of lessons){

        // 3. create element of every lesson

        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> lesson- ${lesson.level_no}
        </button>
        
        `;


        // 4. append into container

        levelContainer.append(btnDiv);

    }

    
    

}
loadLessons();