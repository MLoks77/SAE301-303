import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // maxime derènes
import { Router } from '@angular/router'; // maxime derènes
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  // maxime derènes
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // Vérifier l'état de connexion en vérifiant la présence du token en local storage, pour afficher ou non le btn deconnexion
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/accueil']);
  }
  // fin m.d.
}
