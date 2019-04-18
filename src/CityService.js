import { City } from "./City";
import { from } from "rxjs";

export class CityService {
    constructor() {
        this.cities = [];
    }

    getCityById(id) {
        return from(
            fetch(`http://localhost:3000/cities/${id}/`)
            .then(response => response.json())
            .then(data => console.log(data))
        );
    }

    // Need more functions..
    // data.location.latitude

}

