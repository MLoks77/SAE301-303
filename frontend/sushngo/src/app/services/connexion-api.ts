import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConnexionApi {
  API_URL = "urlAPI"; //à remplacer ici par la vraie url
  constructor(private http: HttpClient) {

  }

  getUserDataFromApi() {
    return this.http.get(this.API_URL);
  }
}