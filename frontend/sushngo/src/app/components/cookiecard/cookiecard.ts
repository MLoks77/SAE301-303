import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookiecard',
  imports: [CommonModule, RouterLink],
  templateUrl: './cookiecard.html',
  styleUrl: './cookiecard.css',
})
export class Cookiecard {
  public message: string = ""; //aucun message affiché car "" par défaut

  public isClosed: boolean = false; //variable pour savoir si cookiecard est fermée (ici non)

  accepterCookies() {
    this.message = "Les cookies ont été acceptés. Miam !";

    setTimeout(() => { //setTimeout = chronomètre et 2000 = 2000ms (2secondes)
      this.isClosed = true; //isClosed = true -> Cookiecard disparait
    }, 2000);
  }

  refuserCookies() {
    this.message = "Les cookies ont été refusés. Oh non !";

    setTimeout(() => {
      this.isClosed = true;
    }, 2000);
  }
}
