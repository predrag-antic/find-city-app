
import { CityService } from "./CityService";
import { Observable, fromEvent } from "rxjs";
import { map, switchMap, debounceTime} from "rxjs/operators";

const service = new CityService();

//service.getCityById(2);

createHeader();
createSearcCityForm();
createChangingPart();

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
    const btn = document.createElement('button');
    btn.className = "btn ml-3";
    btn.innerHTML = "Search";
    btn.onclick = searchCityForm;
    searchCity.appendChild(btn);

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
    cityContainer.className = "cityContainer container";
    changeDiv[0].appendChild(cityContainer); 
    
    getCityName();

}

//repair this function..
function getCityName(){
    const cityName = document.getElementsByClassName("cityName");
    fromEvent(cityName[0],"input").pipe(
    map(ev=>ev.target.value),
    switchMap(name=>service.getCityById(name)))
    .subscribe(city => showCityName(city)); 
}; 

function showCityName(city){
    const cityContainer = document.getElementsByClassName('cityContainer');
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
                                    </div>
                                        
                                    `;
    
}


//                 
function exploreCitiesForm() {
    //CHANGE WHOLE
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
    button.innerHTML = 'Search';
    button.onclick = showCitiesByIndex;
    selectForm.appendChild(button);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'infoDiv mt-5';
    selectionIndex.appendChild(infoDiv);

}

function showCitiesByIndex() {
    const index = document.getElementsByClassName('selInd')[0].value;
    
    Promise.all([
        index,
        service.getCities()
    ])
    .then(([index,cities]) => {
        getIndicesWithNames(cities,index);
    })

}
  
function getIndicesWithNames(cities,index) {
    const infoDiv = document.getElementsByClassName('infoDiv');
    infoDiv[0].innerHTML = " ";
    cities.forEach( city => { 
        const ind = service.getIndexOfCity(city.id,index);
        var nameWithIndex = document.createElement('div');
        nameWithIndex.innerHTML = `${city.name} - ${ind}`;
        infoDiv[0].appendChild(nameWithIndex);
    });
}