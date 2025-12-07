import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

/* export interface utilisateur {
  id_user: number;
  api_token: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  statut_etud: boolean; // 0 ou 1 (tinyint est l'équivalent de boolean)
  tel: number;
  adresse: string;
  fidelite: number;
}*/

@Injectable({
  providedIn: 'root',
})
export class ConnexionApi {
  protected API_URL = "urlAPI"; //à remplacer ici par la vraie url

  constructor(private http: HttpClient) {}

  getUserDataFromApi() {
    return this.http.get(this.API_URL);
  }

  /* getUserDataFromApi(): Observable<utilisateur[]> {
    return this.http.get<utilisateur[]>(this.API_URL);
  }*/

}