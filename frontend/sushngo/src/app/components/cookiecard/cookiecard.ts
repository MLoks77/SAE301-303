import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// sebastien chisiu
@Component({
  selector: 'app-cookiecard',
  imports: [CommonModule, RouterLink],
  templateUrl: './cookiecard.html',
  styleUrl: './cookiecard.css',
})
export class Cookiecard {
  public message: string = ""; //aucun message affiché car "" par défaut

  public isClosed: boolean = false; //variable pour savoir si cookiecard est fermée (ici non)

  ngOnInit() {
    // Vérifie si l'utilisateur a déjà fait un choix
    if (localStorage.getItem('cookieDecision')) {
      this.isClosed = true;
    }
  }

  accepterCookies() {
    this.message = "Les cookies ont été acceptés. Miam !";
    localStorage.setItem('cookieDecision', 'accepted'); // Sauvegarde le choix

    setTimeout(() => { //setTimeout = chronomètre et 2000 = 2000ms (2secondes)
      this.isClosed = true; //isClosed = true -> Cookiecard disparait
    }, 2000);
  }

  refuserCookies() {
    this.message = "Les cookies ont été refusés. Oh non !";
    localStorage.setItem('cookieDecision', 'refused'); // Sauvegarde le choix

    setTimeout(() => {
      this.isClosed = true;
    }, 2000);
  }
}
