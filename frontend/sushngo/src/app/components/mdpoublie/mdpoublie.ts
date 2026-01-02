import { Component, OnInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mdpoublie',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule, Navbar, Footer, HttpClientModule],
  templateUrl: './mdpoublie.html',
  styleUrl: './mdpoublie.css',
})
export class Mdpoublie implements OnInit {
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  loginData = {
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  showNewMdp: boolean = false;
  showConfirmNewMdp: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.loginData.email) {
      this.errorMessage = 'Veuillez entrer votre email.';
      return;
    }

    if (!this.loginData.newPassword) {
      this.errorMessage = 'Veuillez entrer un nouveau mot de passe.';
      return;
    }

    if (!this.loginData.confirmNewPassword) {
      this.errorMessage = 'Veuillez confirmer le nouveau mot de passe.';
      return;
    }

    if (this.loginData.newPassword !== this.loginData.confirmNewPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    this.authService.resetPassword({
      email: this.loginData.email,
      newPassword: this.loginData.newPassword
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.successMessage = 'Mot de passe modifié avec succès ! Vous pouvez vous connecter.';
          this.resetForm();
          setTimeout(() => { this.router.navigate(['/inscription-connexion']); }, 1000);
        } else {
          this.errorMessage = res.error || res.message || res.reponse || 'Une erreur a été détectée lors de la modification de votre mot de passe.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || err.error?.message || 'Une erreur est survenue.';
        console.error(err);
      }
    });
  }

  togglePassword(field: string): void {
    if (field === 'new_mdp') this.showNewMdp = !this.showNewMdp;
    if (field === 'confirm_new_mdp') this.showConfirmNewMdp = !this.showConfirmNewMdp;
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  private resetForm(): void {
    this.loginData = {
      email: '',
      newPassword: '',
      confirmNewPassword: ''
    };
  }
}