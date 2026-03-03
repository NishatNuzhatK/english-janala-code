const loadLessons = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then((json)=> displayLessons(json.data));
};


const displayLessons = (lessons) =>{
    // 1.get the container and empty it

    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2. get into every lesson
    for(let lesson of lessons){

        // 3. create element of every lesson

        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> lesson- ${lesson.level_no}
        </button>
        
        `;


        // 4. append into container

        levelContainer.append(btnDiv);

    }

    
    

}
loadLessons();