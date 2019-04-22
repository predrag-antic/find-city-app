import { City } from "./City";
import { from } from "rxjs";

export class CityService {
    constructor() {
        
    }

    getCities(){
        return fetch(`http://localhost:3000/cities`)
            .then(response => response.json())
        
    }

    getCityById(id) {
        var iD = id.toLowerCase();
        return from(
            fetch(`http://localhost:3000/cities/${iD}`)
            .then(response => response.json())
        );
    }

    getIndexOfCity(city,index) {
        return from(//fix!
            fetch(`http://localhost:3000/cities/${city}/indices.${index}`)
            .then(response => response.json())
        );
    }

    qualityOfLifeIndex(city) {
        return qualityOfLifeIndex = Math.max(0, 100 + city.indices.purchasingPowerInclRentIndex / 2.5 - (city.indices.housePriceToIncomeRatio * 1.0) - city.indices.costOfLivingIndex / 10 + city.indices.safetyIndex / 2.0 + city.indices.healthIndex / 2.5 - city.indices.trafficTimeIndex / 2.0 - city.indices.pollutionIndex * 2.0 / 3.0 + city.indices.climateIndex / 3.0);
    }
}

