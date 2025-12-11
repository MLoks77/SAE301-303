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
  protected API_URL = "http://localhost/SAE301-303/backend/api/api.php"; //à remplacer ici par la vraie url

  constructor(private http: HttpClient) {}

  getUserDataFromApi() {
    return this.http.get(this.API_URL);
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
  
    return this.http.post(`${this.API_URL}/add_user.php`, dataForApi, {
      withCredentials: true
    });
  }
  
  /* login(connexionData: {
    email_connex: string,    // ← Nom Angular
    mdp_connex: string       // ← Nom Angular
  }): Observable<LoginResponse> {
    
    const dataForApi = {
      email: connexionData.email_connex,      // ← Mapping
      password: connexionData.mdp_connex      // ← Mapping
    };
  
    return this.http.post<LoginResponse>(`${this.API_URL}/login.php`, dataForApi, {
      withCredentials: true
    });
  } */

  /* getUserDataFromApi(): Observable<utilisateur[]> {
    return this.http.get<utilisateur[]>(this.API_URL);
  }*/

}