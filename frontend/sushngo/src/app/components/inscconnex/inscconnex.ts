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
    const sectionbtn = document.getElementById('tab-section-btn');

    if (!btnConnexion || !btnInscription) return;

    sectionbtn?.classList.add('row', 'border-black', 'border', 'rounded-[40px]', 'my-4', 'mx-[125px]', 'pt-[0.35rem]', 'text-center', 'h-15', 'w-58');

    btnConnexion.classList.remove('bg-[#F64F4F]', 'text-white');
    btnInscription.classList.remove('bg-[#F64F4F]', 'text-white');

    if (tab === 'connexion') {
      btnConnexion.classList.add('cursor-pointer', 'inline-block', 'rounded-[40px]', 'text-center', 'w-28', 'p-3', 'mr-[-1rem]', 'ml-[-1.2rem]', 'bg-[#F64F4F]', 'text-white');
      btnConnexion.classList.remove('ml-[1.2rem]');
      btnInscription.classList.remove('w-28', 'p-3', 'ms-[0.7rem]', 'ml-[-1.2rem]');
    } else if (tab === 'inscription') {
      btnInscription.classList.add('cursor-pointer', 'inline-block', 'rounded-[40px]', 'text-center', 'w-28', 'p-3', 'mr-[0.7rem]', 'ml-[-1.2rem]', 'bg-[#F64F4F]', 'text-white');
      btnConnexion.classList.add('cursor-pointer', 'col-md-1', 'inline-block', 'text-center', 'ml-[0.1rem]');
      btnConnexion.classList.remove('inline-block', 'rounded-[40px]', 'text-center', 'w-28', 'p-3', 'mr-[-1rem]', 'bg-[#F64F4F]', 'text-white');
    }
  }
}