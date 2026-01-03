//fichier réalisé par Sebastian

import { Component, inject, ViewChild } from '@angular/core'; // Ajout de ViewChild par Joachim
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { PanierService } from '../../services/panierService/panierService';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Ajout par Joachim
import { Router } from '@angular/router'; // Ajout par Joachim
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-panier',
  imports: [Navbar, Footer, RouterLink, CommonModule, FormsModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier implements OnInit {
  // Joachim

  // Référence au formulaire pour la validation
  @ViewChild('commandeForm') commandeForm!: NgForm;

  successMessage: string = '';
  errorMessage: string = '';

  typeCarte: string = '';
  nomCarte: string = '';
  numCarte: string = '';
  dateExpiration: string = '';
  cvv: string = '';

  // false = à emporter, true = livraison
  isLivraison: boolean = true;

  constructor(private router: Router, private panierService: PanierService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  getItemsPanier() {
    return this.panierService.getPanier();
  }

  getNombreTotalProduits(): number {
    return this.panierService.getPanier().reduce((total, commande) => {
      return total + (commande.quantite || 0);
    }, 0);
  }

  getTotalPanier(): number {
    return this.panierService.getPanier().reduce((total, commande) => {
      return total + (parseFloat(commande.prixTotal) || 0);
    }, 0);
  }

  getTotalApresReduction(): number {
    const total = this.getTotalPanier() + this.getPrixLivraison();
    if (this.authService.isStudent()) {
      return total * 0.95;
    } else {
      return total;
    }
  }

  getReduction(): number {
    const totalSansReduc = this.getTotalPanier() + this.getPrixLivraison();
    return parseFloat((totalSansReduc - this.getTotalApresReduction()).toFixed(2));
  }

  getPrixLivraison(): number {
    return this.isLivraison ? 5 : 0;  //this.isLivraison ? checke si c'est true ou false, et si la réponse est true, prix livraison = 5 sinon = 0
  }

  getPointsFidelite(): number {
    return Math.round(this.getTotalPanier());
  }

  supprimerArticle(index: number) {
    this.panierService.supprimerArticle(index);
  }

  // Fonction permmettant de vider les messages par Joachim
  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  // Fonction de calcul du prix total par Joachim
  getPrixTotal(): number {
    return this.getTotalPanier() + this.getPrixLivraison();
  }

  // Fonction de validation et de soumission du formulaire par Joachim
  onSubmit(): void {
    if (this.getItemsPanier().length === 0) {
      this.errorMessage = "Votre panier est vide. Ajoutez des produits avant de passer commande.";
      this.successMessage = '';
      return;
    }

    if (!this.commandeForm || !this.commandeForm.valid) {
      this.errorMessage = "Veuillez compléter tous les champs pour valider le paiement.";
      this.successMessage = '';
      return;
    }

    this.clearMessages();

    const commandeData = {
      date_commande: new Date().toISOString(),
      prix_total: this.getPrixTotal(),
      mode: this.isLivraison ? 'livraison' : 'emporter',
      produits: this.getItemsPanier().map(item => {
        return {
          id_produit: Number(item.id_produit || item.produit?.id_produit),
          quantite: item.quantite
        };
      })
    };

    this.panierService.envoiBdd(commandeData).subscribe({
      next: (res) => {
        if (res.success) {
          this.successMessage = 'Votre commande a été validée avec succès !';
          this.errorMessage = '';

          this.panierService.viderPanier();

          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/accueil']);
          }, 2000);
        } else {
          this.errorMessage = res.error || res.message || res.reponse || 'Une erreur est survenue lors de l\'envoi de la commande.';
          console.log('Réponse API :', res);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || err.error?.message || 'Une erreur est survenue lors de l\'envoi de la commande.';
        console.error('Erreur lors de l\'envoi de la commande:', err);
      }
    });
  }

  // Formatage automatique du numéro de carte (XXXX XXXX XXXX XXXX)
  formatNumCarte(event: any) {
    let input = event.target; // on récup le input 
    let value = input.value.replace(/\D/g, '').substring(0, 16); //input.value = ce qui a été tapé , .replace(/\D/g, '') = supprime les caractères qui ne sont pas des chiffres et on les remplace par du vide , .substring(0,16) on garde que les 16premiers chiffres
    let formattedValue = ''; //variable qui va contenir le numéro de la carte formaté vide par défaut 

    for (let i = 0; i < value.length; i++) { //On parcourt chaque chiffre nettoyé un par un
      if (i > 0 && i % 4 === 0) { // si la position est un multiple de 4, on ajoute un espace
        formattedValue += ' ';
      }
      formattedValue += value[i];// on ajoute le chiffre à la variable formatée
    }

    this.numCarte = formattedValue; //met à jour le numéro de la carte
    input.value = formattedValue; //met à jour l'input
  }

  // Formatage automatique de la date d'expiration (MM/AA)
  formatDateExpiration(event: any) {
    let input = event.target; //récup le input en question
    let value = input.value.replace(/\D/g, '').substring(0, 4); //on garde que les 4 premiers chiffres

    if (value.length >= 2) {
      this.dateExpiration = value.substring(0, 2) + '/' + value.substring(2); //on ajoute un / entre les 2 premiers et les 2 suivants
    } else {
      this.dateExpiration = value;
    }

    input.value = this.dateExpiration; //met à jour l'input
  }
}