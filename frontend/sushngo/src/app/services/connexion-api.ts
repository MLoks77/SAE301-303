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
  statut_etud: boolean;
  tel: number;
  adresse: string;
  fidelite: number;
}*/

@Injectable({
  providedIn: 'root',
})
export class ConnexionApi {
  protected API_URL = "http://localhost/SAE301-303/backend/nomfichier..."; // ajoutez dans api.php vos parties pour fetch et push les infos

  constructor(private http: HttpClient) {}

  getUserDataFromApi() {
    return this.http.get(this.API_URL);
  }

  /* getUserDataFromApi(): Observable<utilisateur[]> {
    return this.http.get<utilisateur[]>(this.API_URL);
  }*/

}