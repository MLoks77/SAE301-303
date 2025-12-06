import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecupBox {
  API_URL = "urlAPI"; //à remplacer ici par la vraie url
  constructor(private http: HttpClient) {

  }
  boxData = { //test de box dans les variables locales
    id: 1,
    name: 'Sushi 1',
    ingredients: 'Poisson'
  }

  getBoxDataFromApi() {
    return this.http.get(this.API_URL);
  }
}
