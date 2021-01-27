let dataList;
let homeList = [];
let allData;
const heroCard = document.querySelector('.hero__card');
let currentPage = 'https://swapi.dev/api/people/';



//начало приложения- функция - обращаемся к серверу, на котором хранятся данные
function loadPage() {
    fetch(currentPage)
        .then(response => response.json())
        .then((data) => {
            dataList = data.results;  //из всего массива обращаемся к массиву с массивом героев и сохраняем его в собственный массив dataList
            allData = data;
            findPlanet(dataList); // передаем массив героев в функцию, чтобы вытащить ссылку на массив с характеристиками планет
            render(); //передаем на отрисовку данные героев, которые мы вытащили из массива
        });
}


// функция, которая переключает на след. страницу
function nextPage() {
    if (allData.next) {
        clearRender();
        currentPage = allData.next;   // присваиваем текущей странице адрес следующей
        loadPage(currentPage);        // передаем новый адрес для загрузки
    }
}

// при клике на правую стрелку, переходим на след. страницу
const next = document.getElementById('arrowRight');
next.onclick = nextPage;




// функция, которая переключает на пред. страницу
function prevPage() {
    if (allData.previous) {
        clearRender();
        currentPage = allData.previous;  // присваиваем текущей странице адрес предыдущей
        loadPage(currentPage);        // передаем новый адрес для загрузки
    }
}

const prev = document.getElementById('arrowLeft');
prev.onclick = prevPage;

function clearRender() {
    const warriorsList = document.querySelector('.warriors__list');
    warriorsList.innerHTML = '';
    homeList = [];
}


// функция, которая возьмет ссылку на массив планет и вытащит название планеты рождения героя
function findPlanet(dataList) {
    dataList.map(function (hero, idx) {  // перебираем массив героев
        fetch(hero.homeworld)          // вытаскиваем название планеты героя
            .then(response => response.json())
            .then((home) => {
                homeList[idx] = home.name; // сохраняем название планеты в новый массив
                render(); //передаем на отрисовку данные планеты, которые мы вытащили из массива
            })
    })
}

//функция отрисовки данных героя
function render() {
    const warriorsList = document.querySelector('.warriors__list');

    //добавляем плагин - будет крутиться, пока загружется название планет
    const loaderPlanet = `
    <div class="pulse"></div>
    `
    warriorsList.innerHTML = dataList.map(function (warrior, idx) {   //перебираем массив героев
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
                    <p class="planet__info-place text-info">${homeList[idx] ? homeList[idx] : loaderPlanet}</p> 
                </div>
            </li>
        `
    }).join('');
}



// функция при клике на переключатель двигает ползунок вправо и открывает страницу героя
function toggleCheck(idx) {
    const toggleCircle = document.getElementById('toggle__circle' + idx); // определем по какому элементу кликнули
    toggleCircle.classList.add('toggle__circle-check');
    openCloseCard(idx);   // вызываем функцию открытия карточки
}

//функция открытия карточки
function openCloseCard(idx) {
    heroCard.classList.add('hero__card-show');
    showHeroInfo(idx);                                       //вызываем функцию отрисовки данных героя
    const arrowBack = document.getElementById('arrowBack');   // стрелочка закрытия карточки
    arrowBack.onclick = () => {                                // при клике по ней закрываем карточку
        heroCard.classList.remove('hero__card-show');
        const toggleCircle = document.getElementById('toggle__circle' + idx);
        toggleCircle.classList.remove('toggle__circle-check');  // передвигаем тумблер влево
    }

}


// функция заполняем карточку героя
function showHeroInfo(idx) {
    const heroName = document.querySelector('.hero__title-info');
    heroName.textContent = dataList[idx].name;

    const heroBirthday = document.querySelector('.year__info');
    heroBirthday.textContent = dataList[idx].birth_year;

    const heroHome = document.querySelector('.home__info');
    heroHome.textContent = homeList[idx];                  // название планеты рождения героя

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

    const heroPic = document.querySelector('.hero__pic');
    heroPic.style.backgroundImage = 'url(' + picBank[idx] + ')';  //подставляем в background css картинку нужного героя из массива
}


// массив с картинками героев
const picBank = [
    'img/luke_skywalker.jpg',
    'img/C_3PO.jpg',
    'img/r2d2.jpg',
    'img/Darth_Vader.jpg',
    'img/Leia_Organa.jpg',
    'img/Owen_Lars.jpg',
    'img/Beru_Whitesun_lars.jpg',
    'img/R5_D4.jpg',
    'img/Biggs_Darklighter.jpg',
    'img/Obi_Wan_Kenobi.jpg'
]

loadPage();  // вызываем функцию первоначальной загрузки страницы
