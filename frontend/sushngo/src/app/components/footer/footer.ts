import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // maxime derènes
import { Router } from '@angular/router'; // maxime derènes
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // joachim tocqueville
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit, OnDestroy {

  // maxime derènes
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

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

    // S'abonner aux changements connexion pour mise à jour automatique
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) {
        localStorage.removeItem('token');
      }
    });
  }

  ngOnDestroy() {
    // Nettoyer l'abo / comme logout
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout(); // Appel de l'API pour déc côté serveur (met à jour isLoggedIn$ automatiquement)
    localStorage.removeItem('token');
    this.router.navigate(['/accueil']);
  }
  // fin m.d.
}
