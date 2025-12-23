import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http'; // pour api ( maxime derènes )
import { Router } from '@angular/router'; // pour api ( maxime derènes )

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  // témi kergastel
  ngOnInit() {
    // Vérifier l'état de connexion en vérifiant la présence du token en local storage
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() { // a fix quand on aura mis le logout dans le service
    this.authService.logout();
    this.isLoggedIn = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // témi kergastel
  closeMenu() {
    this.isMenuOpen = false;
  }
}



