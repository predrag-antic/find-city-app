
import { CityService } from "./CityService";
import { Observable } from "rxjs";

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
    cont.className = "container searchDiv my-5";
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
    //CHANGE WHOLE
    const changeDiv = document.getElementsByClassName('change');
    changeDiv[0].innerHTML = '';
        
    var cityContainer = document.createElement('div');
    cityContainer.className = "cityContainer container";
    changeDiv[0].appendChild(cityContainer); 
    
    //test
    service.getCityById("madrid");
    var cityName = document.createElement('div');
    cityName.innerHTML = `<h1></h1>`;
    cityContainer.appendChild(cityName);
}

function exploreCitiesForm() {
    //CHANGE WHOLE
    var changeDiv = document.getElementsByClassName('change');
    var lbl = document.createElement('label');
    changeDiv[0].innerHTML = '';
    lbl.innerHTML = "Proba!";
    changeDiv[0].appendChild(lbl);
}          