import { Component, inject } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { PanierService } from '../../services/panierService/panierService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  imports: [Navbar, Footer, RouterLink, CommonModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier {
  constructor(private panierService: PanierService) { }

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
    return this.isLivraison ? 5 : 0;  //this.isLivraison ? checke si c'est true ou false , et si la réponse est true ,prix livraison = 5 sinon = 0
  }

  getPointsFidelite(): number {
    return Math.round(this.getTotalPanier());
  }

  ValiderCommande(): void {
    alert("Votre commande a été validée avec succès");
  }

  supprimerArticle(index: number) {
    this.panierService.supprimerArticle(index);
  }
}
