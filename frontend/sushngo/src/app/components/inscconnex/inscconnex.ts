import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inscconnex',
  imports: [CommonModule, FormsModule, RouterModule],
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

    tabConnexion.style.display = 'block';
    tabInscription.style.display = 'none';

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
    const mdpConfirmInput = document.getElementById('confirmMotDePasse-inscription') as HTMLInputElement;

    if (!mdpInput || !mdpConfirmInput) return;

    const password = mdpInput.value;
    const confirmPassword = mdpConfirmInput.value;

    mdpConfirmInput.classList.remove('bg-[#F64F4F]', 'text-white', 'hover:bg-[#ff3c3c]');
    mdpConfirmInput.placeholder = 'Confirmer le mot de passe';

    if (password !== confirmPassword) {
      mdpConfirmInput.classList.add('bg-[#F64F4F]', 'text-white', 'hover:bg-[#ff3c3c]');
      mdpConfirmInput.value = '';
      mdpConfirmInput.placeholder = 'Les mots de passe ne correspondent pas';
      mdpConfirmInput.focus();
      alert('Les mots de passe ne correspondent pas. Veuillez confirmer.');
    } else {
      console.log('Formulaire valide, prêt à être envoyé');
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
      this.setActiveTab('connexion');
      this.currentTab = 'connexion';
    } else if (tabName === 'inscription') {
      tabConnexion.style.display = 'none';
      tabInscription.style.display = 'block';
      this.setActiveTab('inscription');
      this.currentTab = 'inscription';
    }
  }

  private setActiveTab(tab: string): void {
    const btnConnexion = document.getElementById('tab-btn-connexion');
    const btnInscription = document.getElementById('tab-btn-inscription');
    const btnSection = document.getElementById('tab-btn');

    if (!btnConnexion || !btnInscription) return;

    if (tab === 'connexion') {
      btnSection?.classList.add('row', 'border-black', 'border', 'rounded-[40px]', 'my-4', 'mx-[125px]', 'pt-[0.35rem]', 'text-center', 'h-15', 'w-58');
      btnConnexion.classList.add('cursor-pointer', 'col-md-1', 'inline-block', 'bg-[#F64F4F]', 'rounded-[40px]', 'text-center', 'text-white', 'w-30', 'mr-[0.7rem]', 'ms-[-0.7rem]', 'p-3');
      btnInscription.classList.add('cursor-pointer', 'col-md-1', 'inline-block', 'text-center');
    } else {
      btnSection?.classList.add('row', 'border-black', 'border', 'rounded-[40px]', 'my-4', 'mx-[125px]', 'pt-[0.35rem]', 'text-center', 'h-15', 'w-58');
      btnConnexion.classList.add('cursor-pointer', 'col-md-1', 'inline-block', 'bg-[#F64F4F]', 'rounded-[40px]', 'text-center', 'text-white', 'w-30', 'mr-[0.7rem]', 'ms-[-0.7rem]', 'p-3');
      btnInscription.classList.add('cursor-pointer', 'col-md-1', 'inline-block', 'text-center');
    }
  }
}