
let dataList;
let homeList=[];

const heroCard = document.querySelector('.hero__card');


fetch('https://swapi.dev/api/people/')
  .then(response => response.json())
  .then((data) => {
    dataList = data.results;
    //findPlanet();
    render();
    });
    
    
   
    
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
                            <div class="toggle__block" onclick="toggleCheck(${idx})">  
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



// функция при клике на переключатель двигает ползунок вправо и открывает страницу героя
function toggleCheck(idx){
    const toggleCircle = document.getElementById('toggle__circle' + idx); // определем по какому элементу кликнули
    toggleCircle.classList.add('toggle__circle-check');  
    openCloseCard(idx);   // вызываем функцию открытия карточки
}

//функция открытия карточки
function openCloseCard(idx){
    heroCard.classList.add('hero__card-show')
    showHeroInfo(idx)                                       //вызываем функцию отрисовки данных героя
    const arrowBack = document.getElementById('arrowBack')   // стрелочка закрытия карточки
    arrowBack.onclick = () =>{                                // при клике по ней закрываем карточку
        heroCard.classList.remove('hero__card-show')
        const toggleCircle = document.getElementById('toggle__circle' + idx)
        toggleCircle.classList.remove('toggle__circle-check')  // передвигаем тумблер влево
    }
    
}


// функция заполняем карточку героя
function showHeroInfo(idx){
    const heroName = document.querySelector('.hero__title-info');  
    heroName.textContent = dataList[idx].name;

    const heroBirthday = document.querySelector('.year__info');
    heroBirthday.textContent = dataList[idx].birth_year;

    const heroHome = document.querySelector('.home__info');
    heroHome.textContent = dataList[idx].homeworld;

    const heroEye = document.querySelector('.eye__info');
    heroEye.textContent = dataList[idx].eye_color;

    const heroGender = document.querySelector('.gender__type');
    heroGender.textContent = dataList[idx].gender;

    const heroHair = document.querySelector('.hair__info');
    heroHair.textContent = dataList[idx].hair_color;

    const heroMass = document.querySelector('.mass__value');
    heroMass.textContent = dataList[idx].mass;

    const heroSkin = document.querySelector('.skin__type');
    heroSkin.textContent = dataList[idx].skin_color;
}

