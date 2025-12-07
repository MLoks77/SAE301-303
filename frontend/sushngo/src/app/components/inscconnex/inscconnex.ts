import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { ConnexionApi /*, utilisateur */ } from '../../services/connexion-api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscconnex',
  imports: [CommonModule, FormsModule, RouterModule, Navbar, Footer, ConnexionApi],
  templateUrl: './inscconnex.html',
  styleUrl: './inscconnex.css',
})
export class Inscconnex implements OnInit {
  currentTab: string = 'connexion';
  /* apiData: utilisateur[] = [];
  isLoading: boolean = false;
  error: string | null = null; */

  nom: string = '';
  prenom: string = '';
  email_inscr: string = '';
  email_connex: string = '';
  mdp_inscr: string = '';
  confirm_mdp_inscr: string = '';
  mdp_connex: string = '';
  etudiant: string = '';
  telephone: string = '';
  adresse: string = '';

  
  // État du formulaire
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  protected API_URL = "";

  constructor(private http: HttpClient) {}

  // Méthode pour la soumission
  onSubmit(): void {
    console.log("Envoi vers l'API");
    /* console.log('Nom:', this.nom);
    console.log('Prénom:', this.prenom);
    console.log("Email d'inscription:", this.email_inscr);
    console.log('Email de connexion:', this.email_connex);
    console.log("Mot de passe d'inscription:", this.mdp_inscr);
    console.log("Confirmation du mot de passe d'inscription:", this.confirm_mdp_inscr);
    console.log('Mot de passe de connexion:', this.mdp_connex);
    console.log('Étudiant:', this.etudiant);
    console.log('Téléphone:', this.telephone);
    console.log('Adresse:', this.adresse); */

    if(this.isSubmitting = true) {
      this.successMessage = 'Formulaire envoyé avec succès !';
    } else {
      this.errorMessage = "Échec de l'envoi du formulaire.";
    }

    // Prépare les données à envoyer
    const formData = {
      nom: this.nom,
      prenom: this.prenom,
      email_inscr: this.email_inscr,
      email_connex: this.email_connex,
      mdp_inscr: this.mdp_inscr,
      confirm_mdp_inscr: this.confirm_mdp_inscr,
      mdp_connex: this.mdp_connex,
      etudiant: this.etudiant,
      telephone: this.telephone,
      adresse: this.adresse,
    };

    // Envoie vers l'API
    this.http.post<any>(this.API_URL, formData).subscribe({
      next: (response) => {
        console.log("Réponse de l'API:", response);
        this.isSubmitting = false;
        this.successMessage = response.message || 'Formulaire envoyé avec succès !';
        
        // Réinitialise le formulaire
        this.nom = '';
        this.prenom = '';
        this.email_inscr = '';
        this.email_connex = '';
        this.mdp_inscr = '';
        this.confirm_mdp_inscr ='';
        this.mdp_connex = '';
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

  ngOnInit(): void {}

  apiData: any;

  /* getData(): void {
    this.isLoading = true;
    this.error = null;
    
    this.connexionApi.getUserDataFromApi().subscribe({
      next: (users) => {
        this.apiData = users;
        this.isLoading = false;
        console.log('Données reçues:', users);
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des données';
        this.isLoading = false;
        console.error('Erreur API:', err);
      },
      complete: () => {
        console.log('Requête terminée');
      }
    });
  } */

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
      // Si bon, continuer (soumission réelle à gérer côté backend ou Angular)
      errorDiv.classList.add('mdp-confirm-invisible');
      // Optionnel: form submission réelle ici
      // (event.target as HTMLFormElement).submit();
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
}