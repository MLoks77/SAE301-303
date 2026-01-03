import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, Navbar, FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  messageEnvoye: boolean = false;

  envoyerMessage(form: any) {
    if (form.invalid) {
      // Force l'affichage des erreurs en "touchant" tous les champs
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
      return;
    }

    this.messageEnvoye = true;
    form.resetForm(); // Vide proprement le formulaire

    setTimeout(() => {
      this.messageEnvoye = false;
    }, 4000);
  }
}
