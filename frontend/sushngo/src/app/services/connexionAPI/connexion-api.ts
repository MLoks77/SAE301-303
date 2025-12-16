/* réalisé par Joachim */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  protected API_URL = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  getUserDataFromApi() {
    return this.http.get(`${this.API_URL}/api.php`);
  }

  inscription(inscriptionData: {
    nom: string,
    prenom: string,
    email_inscr: string,      // ← Nom Angular
    mdp_inscr: string,        // ← Nom Angular
    telephone: string,
    adresse: string,
    etudiant: string
  }): Observable<any> {

    // Transformation des données pour l'API
    const dataForApi = {
      nom: inscriptionData.nom,
      prenom: inscriptionData.prenom,
      email: inscriptionData.email_inscr,       // ← Mapping
      password: inscriptionData.mdp_inscr,      // ← Mapping
      telephone: inscriptionData.telephone,
      adresse: inscriptionData.adresse,
      statut_etud: inscriptionData.etudiant ? 1 : 0
    };

    return this.http.post(`${this.API_URL}/users/fonctions/add_user.php`, dataForApi, {
      withCredentials: true
    });
  }



}