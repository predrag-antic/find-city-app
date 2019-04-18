
import { CityService } from "./CityService";

const service = new CityService();

service.getCityById(2);

createHeader();
createSearcCityForm();

function createHeader() {
    const header = document.createElement('div');
    header.className = "header";
    header.innerHTML = "<h1>Place for picture with text in center..</h1>";
    document.body.appendChild(header);
}

function createSearcCityForm() {
    const cont = document.createElement('div');
    cont.className = "container";
    document.body.appendChild(cont);

    const btn = document.createElement('button');
    btn.className = "btn btn-info ml-3";
    btn.innerHTML = "Find";

    const label = document.createElement('label');
    label.className = "mr-3 label";
    label.innerHTML = "Search for city";

    let input = document.createElement('input');
    
    cont.appendChild(label); 
    cont.appendChild(input);
    cont.appendChild(btn);
}
