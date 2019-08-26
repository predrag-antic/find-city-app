import {
    City
} from "./City";
import { from } from "rxjs";

export class CityService {
    constructor() {

    }

    getCities() {
        return fetch(`http://localhost:3000/cities`)
            .then(response => response.json())
    }

    getTopXCities(x) {
        return fetch(`http://localhost:3000/cities?_sort=indices.qualityOfLifeIndex&_order=desc&_limit=${x}`)
            .then(response => response.json())
    }

    getCitiesFrom() {
        return from(fetch(`http://localhost:3000/cities`)
            .then(response => response.json())
        );
    }

    getCityById(id) {
        var iD = id.toLowerCase();
        return from(
            fetch(`http://localhost:3000/cities/${iD}`)
            .then(response => response.json())
        );
    }

    getCitiesByIndex(index) {
        if (index === "pollutionIndex" || index === "housePriceToIncomeRatio" || index === "costOfLivingIndex" || index === "trafficTimeIndex")
            return fetch(`http://localhost:3000/cities?_sort=indices.${index}&_order=asc`)
                .then(response => response.json())
        else {
            return fetch(`http://localhost:3000/cities?_sort=indices.${index}&_order=desc`)
                .then(response => response.json())
        }
    }

    // qualityOfLifeIndex(city) {
    //     return qualityOfLifeIndex = Math.max(0, 100 + city.indices.purchasingPowerInclRentIndex / 2.5 - (city.indices.housePriceToIncomeRatio * 1.0) - city.indices.costOfLivingIndex / 10 + city.indices.safetyIndex / 2.0 + city.indices.healthIndex / 2.5 - city.indices.trafficTimeIndex / 2.0 - city.indices.pollutionIndex * 2.0 / 3.0 + city.indices.climateIndex / 3.0);
    // }
}