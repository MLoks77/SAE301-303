import { Component, inject, ViewChild } from '@angular/core'; // Ajout de ViewChild par Joachim
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { PanierService } from '../../services/panierService/panierService';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Ajout par Joachim
import { Router } from '@angular/router'; // Ajout par Joachim

@Component({
  selector: 'app-panier',
  imports: [Navbar, Footer, RouterLink, CommonModule, FormsModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier {
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

  constructor(private router: Router, private panierService: PanierService) { }

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

  // false = à emporter, true = livraison
  isLivraison: boolean = true;

  getPrixLivraison(): number {
    return this.isLivraison ? 5 : 0;  //this.isLivraison ? checke si c'est true ou false, et si la réponse est true, prix livraison = 5 sinon = 0
  }

  getPointsFidelite(): number {
    return Math.round(this.getTotalPanier());
  }

  supprimerArticle(index: number) {
    this.panierService.supprimerArticle(index);
  }

  // Fonction de validation du formulaire par Joachim
  ValidationForm(): void{
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
    
    this.successMessage = "Votre commande a été validée avec succès !";
    this.errorMessage = '';
    this.resetPanier();
    
    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/accueil']);
    }, 2000);
  }

  // Fonction permmettant de vider les messages par Joachim
  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  // Fonction qui permet de vider le panier par Joachim
  resetPanier(): void {
    this.panierService.viderPanier();
  }
}
