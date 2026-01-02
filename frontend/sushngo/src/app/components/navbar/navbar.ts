import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http'; // pour api ( maxime derènes )
import { Router } from '@angular/router'; // pour api ( maxime derènes )

// import { ConnexionApi } from '../../services/connexionAPI/connexion-api';
import { AuthService } from '../../services/auth.service'; // joachim tocqueville
import { PanierService } from '../../services/panierService/panierService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {

  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;

  constructor(private http: HttpClient, private router: Router, /*public connexionApi: ConnexionApi,*/ private authService: AuthService, private panierService: PanierService) { }

  getCartCount(): number {
    return this.panierService.getNombreArticlesTotal();
  }

  // témi kergastel, modif par joachim tocqueville
  ngOnInit() {
    // Vérifier l'état de connexion initial avec l'API pour s'assurer que le token est valide côté serveur, et pas juste localement
    this.authService.checkSession().subscribe({
      next: (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        // Si le token n'est pas valide côté serveur, on le supprime du localStorage
        if (!isLoggedIn) {
          localStorage.removeItem('token');
        }
      },
      error: () => {
        // En cas d'erreur, on considère que l'utilisateur n'est pas connecté
        this.isLoggedIn = false;
        localStorage.removeItem('token');
      }
    });

    // S'abonner aux changements d'état de connexion pour mise à jour automatique
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) {
        localStorage.removeItem('token');
      }
    });
  }

  ngOnDestroy() {
    // Nettoyer l'abonnement pour éviter les fuites mémoire
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() { // a fix quand on aura mis le logout dans le service
    this.authService.logout(); // Appel de l'API pour déc côté serveur (met à jour isLoggedIn$ automatiquement)
    localStorage.removeItem('token');
    this.router.navigate(['/accueil']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // témi kergastel
  closeMenu() {
    this.isMenuOpen = false;
  }
}



