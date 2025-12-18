import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  message: string;
  token?: string;
  user?: any;
}

@Component({
  selector: 'app-inscconnex',
  imports: [CommonModule, FormsModule, RouterModule, Navbar, Footer],
  templateUrl: './inscconnex.html',
  styleUrls: ['./inscconnex.css'],
})
export class Inscconnex implements OnInit {
  currentTab: string = 'connexion';
  /* apiData: utilisateur[] = [];
  isLoading: boolean = false;
  error: string | null = null; */
  apiData: any;

  // État du formulaire
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  protected API_URL = "http://localhost/SAE301-303/backend/api/users";

  constructor(private http: HttpClient) { }

  nom: string = '';
  prenom: string = '';
  email_inscr: string = '';
  email_connex: string = '';
  mdp_inscr: string = '';
  mdp_connex: string = '';
  confirm_mdp: string = '';
  telephone: string = '';
  adresse: string = '';
  etudiant: string = '';


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

    return this.http.post(`${this.API_URL}/fonctions/add_user.php`, dataForApi, {
      withCredentials: true
    });
  }

  connexion(connexionData: {
    email_connex: string,    // ← Nom Angular
    mdp_connex: string       // ← Nom Angular
  }): Observable<LoginResponse> {

    const dataForApi = {
      email: connexionData.email_connex,      // ← Mapping
      password: connexionData.mdp_connex      // ← Mapping
    };

    return this.http.post<LoginResponse>(`${this.API_URL}/session/login.php`, dataForApi, {
      withCredentials: true
    });
  }

  onSubmitInscription(): void {
    console.log("Envoi vers l'API");
    console.log('Nom:', this.nom);
    console.log('Prénom:', this.prenom);
    console.log("Email d'inscription:", this.email_inscr);
    console.log("Mot de passe d'inscription:", this.mdp_inscr);
    console.log("Confirmation du mot de passe d'inscription:", this.confirm_mdp);
    console.log('Étudiant:', this.etudiant);
    console.log('Téléphone:', this.telephone);
    console.log('Adresse:', this.adresse);

    if (this.isSubmitting = true) {
      this.successMessage = 'Formulaire envoyé avec succès !';
    } else {
      this.errorMessage = "Échec de l'envoi du formulaire.";
    }

    // Envoie directement tes variables
    this.inscription({
      nom: this.nom,
      prenom: this.prenom,
      email_inscr: this.email_inscr,      // ← Nom original
      mdp_inscr: this.mdp_inscr,          // ← Nom original
      telephone: this.telephone,
      adresse: this.adresse,
      etudiant: this.etudiant
    }).subscribe({
      next: (response) => {
        console.log("Réponse de l'API:", response);
        this.isSubmitting = false;
        this.successMessage = response.message || 'Formulaire envoyé avec succès !';

        // Réinitialise le formulaire
        this.nom = '';
        this.prenom = '';
        this.email_inscr = '';
        this.mdp_inscr = '';
        this.confirm_mdp = '';
        this.etudiant = '';
        this.telephone = '';
        this.adresse = '';
      },
      error: (err) => {
        console.error("Une erreur a été détecté au niveau de l'API:", err);
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || "Erreur lors de l'envoi";
      }
    });
  }

  onSubmitConnexion(): void {
    console.log("Envoi vers l'API");
    console.log("Email de connexion:", this.email_connex);
    console.log("Mot de passe de connexion:", this.mdp_connex);

    if (this.isSubmitting = true) {
      this.successMessage = 'Formulaire envoyé avec succès !';
    } else {
      this.errorMessage = "Échec de l'envoi du formulaire.";
    }

    // Envoie directement tes variables
    this.connexion({
      email_connex: this.email_connex,      // ← Nom original
      mdp_connex: this.mdp_connex,          // ← Nom original
    }).subscribe({
      next: (response) => {
        console.log("Réponse de l'API:", response);
        this.isSubmitting = false;
        this.successMessage = response.message || 'Formulaire envoyé avec succès !';

        // Réinitialise le formulaire
        this.email_connex = '';
        this.mdp_connex = '';
      },
      error: (err) => {
        console.error("Une erreur a été détecté au niveau de l'API:", err);
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || "Erreur lors de l'envoi";
      }
    });
  }

  ngOnInit(): void { }

  initializeTabSystem(): void {
    const btnConnexion = document.getElementById('tab-btn-connexion');
    const btnInscription = document.getElementById('tab-btn-inscription');
    const tabConnexion = document.getElementById('tab-formulaire-connexion');
    const tabInscription = document.getElementById('tab-formulaire-inscription');

    if (!tabConnexion || !tabInscription || !btnConnexion || !btnInscription) {
      console.error('Elements not found');
      return;
    }

    tabInscription.style.display = 'block';
    tabConnexion.style.display = 'none';

    this.setActiveTab('inscription');

    this.setupFormValidation();
  }

  setupFormValidation(): void {
    const formInscription = document.getElementById('tab-formulaire-inscription') as HTMLFormElement;
    if (formInscription) {
      formInscription.addEventListener('submit', (event) => this.validateInscription(event));
    }
  }

  validateInscription(event: Event): void {
    event.preventDefault();
    const mdpInput = document.getElementById('motdepasse-inscription') as HTMLInputElement;
    const mdpconfirmation = document.getElementById('confirmMotDePasse-inscription') as HTMLInputElement;
    const errorDiv = document.getElementById('mdp-confirm-error');

    if (!mdpInput || !mdpconfirmation || !errorDiv) return;

    const password = mdpInput.value;
    const confirmPassword = mdpconfirmation.value;

    // Nettoie l'affichage erreur
    mdpconfirmation.classList.remove('bg-[#F64F4F]', 'text-white', 'hover:bg-[#ff3c3c]');
    mdpconfirmation.placeholder = 'Confirmer le mot de passe';
    errorDiv.classList.add('mdp-confirm-invisible');

    if (password !== confirmPassword) {
      mdpconfirmation.classList.add('bg-[#F64F4F]', 'text-white', 'hover:bg-[#ff3c3c]');
      mdpconfirmation.value = '';
      mdpconfirmation.placeholder = 'Les mots de passe ne correspondent pas';
      errorDiv.classList.remove('mdp-confirm-invisible');
      mdpconfirmation.focus();
      // Pas d'alert pour éviter les soucis UX/affichage
    } else {
      errorDiv.classList.add('mdp-confirm-invisible');
      console.log('Formulaire envoyé');
    }
  }

  switchToTab(tabName: string): void {
    const tabConnexion = document.getElementById('tab-formulaire-connexion');
    const tabInscription = document.getElementById('tab-formulaire-inscription');
    const btnConnexion = document.getElementById('tab-btn-connexion');
    const btnInscription = document.getElementById('tab-btn-inscription');

    if (!tabConnexion || !tabInscription || !btnConnexion || !btnInscription) return;

    if (tabName === 'connexion') {
      tabInscription.style.display = 'none';
      tabConnexion.style.display = 'block';

      // Bouton Actif/Non-actif : styles basés sur le HTML d'origine
      btnConnexion.classList.add('bg-[#F64F4F]', 'text-white');
      btnConnexion.classList.remove('bg-white', 'text-black');
      btnInscription.classList.remove('bg-[#F64F4F]', 'text-white');
      btnInscription.classList.add('bg-white', 'text-black');

      this.currentTab = 'connexion';
    } else if (tabName === 'inscription') {
      tabConnexion.style.display = 'none';
      tabInscription.style.display = 'block';

      btnInscription.classList.add('bg-[#F64F4F]', 'text-white');
      btnInscription.classList.remove('bg-white', 'text-black');
      btnConnexion.classList.remove('bg-[#F64F4F]', 'text-white');
      btnConnexion.classList.add('bg-white', 'text-black');

      this.currentTab = 'inscription';
    }
  }

  private setActiveTab(tab: string): void {
    const btnConnexion = document.getElementById('tab-btn-connexion');
    const btnInscription = document.getElementById('tab-btn-inscription');

    if (!btnConnexion || !btnInscription) return;

    if (tab === 'connexion') {
      btnConnexion.classList.add('bg-[#F64F4F]', 'text-white');
      btnConnexion.classList.remove('bg-white', 'text-black');
      btnInscription.classList.remove('bg-[#F64F4F]', 'text-white');
      btnInscription.classList.add('bg-white', 'text-black');
    } else if (tab === 'inscription') {
      btnInscription.classList.add('bg-[#F64F4F]', 'text-white');
      btnInscription.classList.remove('bg-white', 'text-black');
      btnConnexion.classList.remove('bg-[#F64F4F]', 'text-white');
      btnConnexion.classList.add('bg-white', 'text-black');
    }
  }

  // Variables pour gérer la visibilité
  showMdpInscr: boolean = false;
  showMdpConnex: boolean = false;
  showConfirmMdp: boolean = false;

  // Méthodes pour toggle
  togglePassword(field: string): void {
    if (field === 'mdp_inscr') {
      this.showMdpInscr = !this.showMdpInscr;
    } else if (field === 'mdp_connex') {
      this.showMdpConnex = !this.showMdpConnex;
    } else if (field === 'confirm_mdp') {
      this.showConfirmMdp = !this.showConfirmMdp;
    }
  }
}