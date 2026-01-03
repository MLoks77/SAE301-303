// joachim
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inscconnex',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar, Footer, HttpClientModule],
  templateUrl: './inscconnex.html',
  styleUrls: ['./inscconnex.css'],
})
export class Inscconnex implements OnInit {
  currentTab: string = 'inscription';
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  // Modèles pour les formulaires
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    adresse: '',
    password: '',
    confirmPassword: '',
    statut_etud: false,
    cgu: false
  };

  // Visibilité des mots de passe
  showMdpInscr: boolean = false;
  showMdpConnex: boolean = false;
  showConfirmMdp: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.checkSession().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/accueil']);
      }
    });

    this.changeHeight(this.currentTab);
  }

  switchToTab(tab: string): void {
    this.currentTab = tab;
    this.clearMessages();
    this.changeHeight(tab);
  }

  changeHeight(tab: string): void {
    const connexionbg = document.getElementById('connexionbg');
    if (tab === 'inscription' && window.innerWidth <= 768) {
      connexionbg?.style.setProperty('height', '1300px', 'important');
      connexionbg?.style.setProperty('min-height', '1300px', 'important');
    } else if (tab === 'connexion' && window.innerWidth <= 768) {
      connexionbg?.style.setProperty('height', '780px', 'important');
      connexionbg?.style.setProperty('min-height', '780px', 'important');
    } else if (tab === 'inscription' && window.innerWidth > 768) {
      connexionbg?.style.setProperty('height', '1050px', 'important');
      connexionbg?.style.setProperty('min-height', '1050px', 'important');
    } else if (tab === 'connexion' && window.innerWidth > 768) {
      connexionbg?.style.setProperty('height', '835px', 'important');
      connexionbg?.style.setProperty('min-height', '835px', 'important');
    }
  }

  onSubmitConnexion(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.successMessage = 'Connexion réussie ! Redirection...';
          setTimeout(() => this.router.navigate(['/accueil']), 500);
        } else {
          this.errorMessage = res.message || res.reponse || res.error || 'Identifiants incorrects.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
        console.error(err);
      }
    });
  }

  onSubmitInscription(): void {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (!this.registerData.cgu) {
      this.errorMessage = 'Vous devez accepter les CGU.';
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.successMessage = 'Compte créé avec succès ! Vous pouvez vous connecter.';
          this.resetForm();
          setTimeout(() => this.switchToTab('connexion'), 500);
        } else {
          this.errorMessage = res.error || res.message || res.reponse || 'Erreur lors de l\'inscription.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Une erreur est survenue.';
        console.error(err);
      }
    });
  }

  togglePassword(field: string): void {
    if (field === 'mdp_inscr') this.showMdpInscr = !this.showMdpInscr;
    if (field === 'mdp_connex') this.showMdpConnex = !this.showMdpConnex;
    if (field === 'confirm_mdp') this.showConfirmMdp = !this.showConfirmMdp;
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  resetForm(): void {
    this.registerData = {
      nom: '',
      prenom: '',
      email: '',
      tel: '',
      adresse: '',
      password: '',
      confirmPassword: '',
      statut_etud: false,
      cgu: false
    };
    this.loginData = {
      email: '',
      password: ''
    };
  }
}