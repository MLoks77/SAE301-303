import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { ConnexionApi } from '../../services/connexion-api';

@Component({
  selector: 'app-inscconnex',
  imports: [CommonModule, FormsModule, RouterModule, Navbar, Footer],
  templateUrl: './inscconnex.html',
  styleUrl: './inscconnex.css',
})
export class Inscconnex implements OnInit {
  currentTab: string = 'connexion';

  ngOnInit(): void {
    this.initializeTabSystem();
  }

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

    apiData: any;
    constructor(private ConnexionApi : ConnexionApi) {
    }
    getData() {
      this.ConnexionApi.getUserDataFromApi().subscribe((res=>{
        this.apiData=res;
      }))
    }
}