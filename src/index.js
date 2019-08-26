import { CityService } from "./CityService";
import {
    fromEvent,
    from,
    zip
} from "rxjs";
import {
    map,
    switchMap,
    debounceTime,
    take,
    filter,
    combineAll,
    flatMap
} from "rxjs/operators";

const service = new CityService();

alertTime();
createHeader();
createSearcCityForm();
createChangingPart();
searchCityForm();

function createHeader() {
    const header = document.createElement('div');
    header.className = "header";
    header.innerHTML = "<img src='images/europe-header.jpg' class='img-responsive'><h1 class='centered header-h1'>Find the city you dreamed to live in</h1></img>";
    document.body.appendChild(header);
}

function createSearcCityForm() {
    const cont = document.createElement('div');
    cont.className = "container my-5";
    document.body.appendChild(cont);

    const row = document.createElement('div');
    row.className = "row";
    cont.appendChild(row);

    const searchCity = document.createElement('div');
    searchCity.className = "searchCity col-12 col-md-6 text-center my-4";
    row.appendChild(searchCity);

    const label = document.createElement('label');
    label.className = "label";
    label.innerHTML = "Already know where you're headed?";
    searchCity.appendChild(label);
    let input = document.createElement('input');
    input.className = "cityName";
    searchCity.appendChild(input);
    // const btn = document.createElement('button');
    // btn.className = "btn ml-3";
    // btn.innerHTML = "Search";
    // btn.onclick = searchCityForm;
    // searchCity.appendChild(btn);

    const exploreCities = document.createElement('div');
    exploreCities.className = "exploreCities col-12 col-md-6 text-center my-4";
    row.appendChild(exploreCities);

    const label2 = document.createElement('label');
    label2.className = "label";
    label2.innerHTML = "Wondering where to move?";
    exploreCities.appendChild(label2);
    const btn2 = document.createElement('button');
    btn2.className = "btn ml-3";
    btn2.innerHTML = "Explore cities";
    btn2.onclick = exploreCitiesForm;
    exploreCities.appendChild(btn2);
}

function createChangingPart() {
    const cont = document.createElement('div');
    cont.className = "change";
    document.body.appendChild(cont);
}

function searchCityForm() {
    const changeDiv = document.getElementsByClassName('change');
    changeDiv[0].innerHTML = '';

    var cityContainer = document.createElement('div');
    cityContainer.className = "exploreCityContainer container";
    changeDiv[0].appendChild(cityContainer);

    const cityName = document.getElementsByClassName("cityName");
    fromEvent(cityName[0], "input").pipe(
            debounceTime(1500),
            map(ev => ev.target.value),
            filter(city => city.length > 3),
            switchMap(name => service.getCityById(name))
        )
        .subscribe(city => {
            showCityName(city);
            console.log(city)
        });
};

function showCityName(city) {
    const cityContainer = document.getElementsByClassName('exploreCityContainer');
    cityContainer[0].innerHTML = `<h1 class='text-center selCityName mt-3'>${city.name}</h1>
                                    <div class='cityInfo'>
                                        <div>Country: <h3 class='selCityInfo'>${city.country}</h3></div> 
                                        <div>Population: <h3 class='selCityInfo'>${city.population}</h3></div>
                                    </div>
                                    <div class='cityLoc'>
                                        <div>Latitude:<h3 class='selCityInfo'>${city.location.latitude}</h3></div>
                                        <div>Location:<h3><a class='btn' target='_blank' rel='noopener noreferrer' href='https://www.google.com/maps/@${city.location.latitude},${city.location.longitude},10z'>See on Map</a></h3></div>
                                        <div>Longitude:<h3 class='selCityInfo'>${city.location.longitude}</h3></div>
                                    </div>
                                    <hr>
                                    <div class='indices'>
                                        <div class='indicesRow'>Purchasing Power Index: <h3 class='selCityInfo'>${city.indices.purchasingPowerInclRentIndex}</h3></div>
                                        <div class='indicesRow'>Safety Index: <h3 class='selCityInfo'>${city.indices.safetyIndex}</h3></div>
                                        <div class='indicesRow'>Health Care Index: <h3 class='selCityInfo'>${city.indices.healthIndex}</h3></div>
                                        <div class='indicesRow'>Cost of Living Index: <h3 class='selCityInfo'>${city.indices.costOfLivingIndex}</h3></div>
                                        <div class='indicesRow'>Property Price to Income Ratio: <h3 class='selCityInfo'>${city.indices.housePriceToIncomeRatio}</h3></div>
                                        <div class='indicesRow'>Traffic Commute Time Index: <h3 class='selCityInfo'>${city.indices.trafficTimeIndex}</h3></div>
                                        <div class='indicesRow'>Pollution Index: <h3 class='selCityInfo'>${city.indices.pollutionIndex}</h3></div>
                                        <div class='indicesRow'>Climate Index: <h3 class='selCityInfo'>${city.indices.climateIndex}</h3></div>
                                    </div>`;

}

function exploreCitiesForm() {
    const changeDiv = document.getElementsByClassName('change');
    changeDiv[0].innerHTML = '';

    const cityContainer = document.createElement('div');
    cityContainer.className = "exploreCityContainer container";
    changeDiv[0].appendChild(cityContainer);

    createSearchCitiesForm();
}

function createSearchCitiesForm() {
    const exploreCityContainer = document.getElementsByClassName('exploreCityContainer');

    const searchCitiesForm = document.createElement('div');
    searchCitiesForm.className = 'searchCitiesForm';
    exploreCityContainer[0].appendChild(searchCitiesForm);

    const selectionIndex = document.createElement('div');
    selectionIndex.className = 'selectionIndex';
    searchCitiesForm.appendChild(selectionIndex);

    const label = document.createElement('label');
    label.className = 'label';
    label.innerHTML = 'What metters to you:'
    selectionIndex.appendChild(label);

    const selectForm = document.createElement('div');
    selectionIndex.appendChild(selectForm);

    const select = document.createElement('select');
    select.className = 'selInd';
    selectForm.appendChild(select);

    var option = document.createElement('option');
    option.innerHTML = 'Purchasing Power';
    option.value = 'purchasingPowerInclRentIndex';
    select.appendChild(option);
    var option = document.createElement('option');
    option.innerHTML = 'Safety';
    option.value = 'safetyIndex';
    select.appendChild(option);
    var option = document.createElement('option');
    option.innerHTML = 'Health Care';
    option.value = 'healthIndex';
    select.appendChild(option);
    var option = document.createElement('option');
    option.innerHTML = 'Cost of Living';
    option.value = 'costOfLivingIndex';
    select.appendChild(option);
    var option = document.createElement('option');
    option.innerHTML = 'Property Price to Income Ratio';
    option.value = 'housePriceToIncomeRatio';
    select.appendChild(option);
    var option = document.createElement('option');
    option.innerHTML = 'Traffic Commute Time';
    option.value = 'trafficTimeIndex';
    select.appendChild(option);
    var option = document.createElement('option');
    option.innerHTML = 'Pollution';
    option.value = 'pollutionIndex';
    select.appendChild(option);
    var option = document.createElement('option');
    option.innerHTML = 'Climate';
    option.value = 'climateIndex';
    select.appendChild(option);

    const button = document.createElement('button');
    button.className = 'btn ml-3';
    button.innerHTML = 'Clear search';
    button.onclick = clearSearch;
    selectForm.appendChild(button);


    let cityArray = fromEvent(select, 'change').pipe(
        map(x => x.target.value),
        switchMap(ind => service.getCitiesByIndex(ind)),
        flatMap(cities => cities),
        take(15)
    );

    let index = fromEvent(select, 'change').pipe(
        map(x => x.target.value)
    );

    let cities = zip(cityArray)
        .pipe(combineAll());

    zip(cities, index).subscribe((x) => getIndicesWithNames(x[0], x[1]));


    const topCities = document.createElement('div');
    topCities.className = 'topCities';
    selectionIndex.appendChild(topCities);

    var label2 = document.createElement('label');
    label2.className = 'labelTOP';
    label2.innerHTML = 'See our TOP ';
    topCities.appendChild(label2);

    const selectNum = document.createElement('select');
    selectNum.className = 'selNum ml-3';
    topCities.appendChild(selectNum);

    for (let i = 1; i < 6; i++) {
        var option = document.createElement('option');
        option.innerHTML = i * 5;
        option.value = i * 5;
        selectNum.appendChild(option);
    }

    const buttonSearch = document.createElement('button');
    buttonSearch.className = 'btnSrc btn ml-3';
    buttonSearch.innerHTML = 'Search';
    buttonSearch.onclick = getTopCities;
    topCities.appendChild(buttonSearch);

    const rndBtn = document.createElement('button');
    rndBtn.className = 'rndBtn btn';
    rndBtn.innerHTML = 'Get RANDOM city';
    rndBtn.onclick = getRandomCity;
    selectionIndex.appendChild(rndBtn);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'infoDiv mt-5';
    selectionIndex.appendChild(infoDiv);
}

function clearSearch() {
    const infoDiv = document.getElementsByClassName('infoDiv');
    const select = document.getElementsByClassName('selInd')[0];
    infoDiv[0].innerHTML = " ";
    let cityArray = fromEvent(select, 'change').pipe(
        map(x => x.target.value),
        switchMap(ind => service.getCitiesByIndex(ind)),
        flatMap(cities => cities),
        take(15)
    );

    let index = fromEvent(select, 'change').pipe(
        map(x => x.target.value)
    );

    let cities = zip(cityArray)
        .pipe(combineAll());

    zip(cities, index).subscribe((x) => getIndicesWithNames(x[0], x[1]));
}

function showCitiesByIndex() {
    const index = document.getElementsByClassName('selInd')[0].value;
    service.getCitiesByIndex(index).then(cities => getIndicesWithNames(cities, index));
}

function getIndicesWithNames(cities, index) {
    const infoDiv = document.getElementsByClassName('infoDiv');
    infoDiv[0].innerHTML = " ";
    cities.forEach(city => {
        var nameWithIndex = document.createElement('div');
        nameWithIndex.innerHTML = `<a target='_blank' rel='noopener noreferrer' href='https://www.google.com/maps/@${city.location.latitude},${city.location.longitude},10z'>${city.name}</a> - ${city.indices[index]}`;
        infoDiv[0].appendChild(nameWithIndex);
    });
}

function getTopCities() {
    const infoDiv = document.getElementsByClassName('infoDiv');
    infoDiv[0].innerHTML = " ";

    const btn = document.getElementsByClassName('btnSrc');
    const select = document.getElementsByClassName('selNum')[0].value;

    const qualityOfLifeDiv = document.createElement('div');
    qualityOfLifeDiv.innerHTML = `<label class='mb-4 qol'>Quality of Life</label>`;
    infoDiv[0].appendChild(qualityOfLifeDiv);
    fromEvent(btn[0], "click")
        .subscribe(service.getTopXCities(select).then(cities => cities.forEach(city => showIndex(city))));
}

function showIndex(city) {
    const ind = qualityOfLifeIndex(city);
    const infoDiv = document.getElementsByClassName('infoDiv');
    var nameWithIndex = document.createElement('div');
    nameWithIndex.innerHTML = `<a target='_blank' rel='noopener noreferrer' href='https://www.google.com/maps/@${city.location.latitude},${city.location.longitude},10z'>${city.name}</a> - ${ind}`;
    infoDiv[0].appendChild(nameWithIndex);
}

function getRandomCity() {
    const infoDiv = document.getElementsByClassName('infoDiv');
    infoDiv[0].innerHTML = " ";

    from(service.getCities()).pipe(
        map(cities => cities.length),
        switchMap(num => getRandomNumber(num))
    ).subscribe(rndNum => {
        service.getCities().then(cities => showRandomCity(cities[rndNum]))
    })
}

function showRandomCity(city) {
    const infoDiv = document.getElementsByClassName('infoDiv');
    var cityInfos = document.createElement('div');

    cityInfos.className = 'cityInfos table-responsive';
    cityInfos.innerHTML = ` <table class='table'>
                                <tr><th scope="col">Name</th><th scope="col">Country</th><th scope="col">Population</th><th scope="col">Quality of Life Index</th></tr>
                                <tr><td>${city.name}</td><td>${city.country}</td><td>${city.population}</td><td>${city.indices.qualityOfLifeIndex}</td></tr>
                            </table>
                            <div class='indices'>
                                        <div class='indicesRow'>Purchasing Power Index: <h5 class='selCityInfo'>${city.indices.purchasingPowerInclRentIndex}</h5></div>
                                        <div class='indicesRow'>Safety Index: <h5 class='selCityInfo'>${city.indices.safetyIndex}</h5></div>
                                        <div class='indicesRow'>Health Care Index: <h5 class='selCityInfo'>${city.indices.healthIndex}</h5></div>
                                        <div class='indicesRow'>Cost of Living Index: <h5 class='selCityInfo'>${city.indices.costOfLivingIndex}</h5></div>
                                        <div class='indicesRow'>Property Price to Income Ratio: <h5 class='selCityInfo'>${city.indices.housePriceToIncomeRatio}</h5></div>
                                        <div class='indicesRow'>Traffic Commute Time Index: <h5 class='selCityInfo'>${city.indices.trafficTimeIndex}</h5></div>
                                        <div class='indicesRow'>Pollution Index: <h5 class='selCityInfo'>${city.indices.pollutionIndex}</h5></div>
                                        <div class='indicesRow'>Climate Index: <h5 class='selCityInfo'>${city.indices.climateIndex}</h5></div>
                                    </div>`;
    infoDiv[0].appendChild(cityInfos);
}

function getRandomNumber(num) {
    return new Promise((resolve, reject) => {
        const number = parseInt(Math.random() * num);
        setTimeout(() => {
            resolve(number)
        }, 500);
    })
}

function qualityOfLifeIndex(city) {
    const qualityOfLifeIndex = (Math.max(0, 100 + city.indices.purchasingPowerInclRentIndex / 2.5 - (city.indices.housePriceToIncomeRatio * 1.0) - city.indices.costOfLivingIndex / 10 + city.indices.safetyIndex / 2.0 + city.indices.healthIndex / 2.5 - city.indices.trafficTimeIndex / 2.0 - city.indices.pollutionIndex * 2.0 / 3.0 + city.indices.climateIndex / 3.0)).toFixed(2);
    return qualityOfLifeIndex;
}

function alertTime() {
    setInterval(() =>
        alert(showTime()), 300000);
}

function showTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    return `Keep searching ! ${h}:${m}:${s}`;
}

// function randomNum() {
//     return Math.floor(Math.random() * ((-1) * 100 - 1 * 100) + 1 * 100) / (1*100);
// }