
let dataList;
let homeList=[];
fetch('https://swapi.dev/api/people/')
  .then(response => response.json())
  .then((data) => {
    dataList = data.results;
    //findPlanet();
    render();
    })
    
    
   
    
// function findPlanet(){
//     dataList.map(function(hero){
//         fetch(hero.homeworld)
//         .then(response => response.json())
//         .then((home) =>{
//             homeList.push(home.name);
//             //console.log(homeList)
//             //console.log(home.name)
//         })
//        // console.log(homeList)

//     })
    
// }
// console.log(homeList)

function render(){
    const warriorsList = document.querySelector('.warriors__list');
    warriorsList.innerHTML = dataList.map(function(warrior, idx){


      console.log(warrior.homeworld)
        fetch(warrior.homeworld)
        .then(response => response.json())
        .then((home) =>{
            homeList.push(home.name);

        })
      
     //  console.log(homeList)
 
      //  ${fetch(warrior.homeworld).then(response => response.json()).then((home) => (home.name))}
      
      

        return `
        <li class="hero">
                <div class="main__hero__block">
                    <div class="info__area">
                        <div class="info__title-block">
                            <div class="name__title answer-info">${warrior.name}</div> 
                            <div class="toggle__block" id="toggle__block${idx}" onclick="toggleCheck(${idx})">
                               <div class="toggle__circle" id="toggle__circle${idx}">
                                    <div class="toggle__info">i</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="more__info">
                    <p class="birthday__info text-info">Birthday:</p>
                    <p class="birthday__info-date text-info">${warrior.birth_year}</p>
                   
                    <p class="planet__info text-info">Planet:</p>
                    <p class="planet__info-place text-info"></p>
                </div>
            </li>
        `
    }).join('');
}    




function toggleCheck(idx){
    const toggleCircle = document.getElementById('toggle__circle' + idx)
    toggleCircle.classList.add('toggle__circle-check')
    openCloseCard(idx)
}

const heroCard = document.querySelector('.hero__card')
function openCloseCard(idx){
    heroCard.classList.add('hero__card-show')
    
    const arrowBack = document.getElementById('arrowBack')
    arrowBack.onclick = () =>{
        console.log('hi')
        heroCard.classList.remove('hero__card-show')
        const toggleCircle = document.getElementById('toggle__circle' + idx)
        toggleCircle.classList.remove('toggle__circle-check')
    }
    
}


    // const arrowBack = document.getElementById('arrowBack')
    // arrowBack.onclick = () =>{
    //     console.log('hi')}
      /*
        heroCard.classList.remove('hero__card-show')
        const toggleCircle = document.getElementById('toggle__circle' + idx)
        toggleCircle.classList.remove('toggle__circle-check')
        */
