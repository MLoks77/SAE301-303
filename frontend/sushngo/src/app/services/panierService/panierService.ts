import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanierService {

  produitsPanier: any[] = []; // Tableau des produits dans le panier

  constructor() {
    this.chargerPanier();
  }

  chargerPanier() {
    const panierStocke = localStorage.getItem('panier');
    if (panierStocke) {
      this.produitsPanier = JSON.parse(panierStocke);
    }
  }

  sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(this.produitsPanier));
  }

  ajouterPanier(produit: any): boolean { //ajouter au panier un produit
    let totalActuel = this.produitsPanier.reduce((acc, item) => acc + item.quantite, 0);

    if (totalActuel + produit.quantite > 10) {
      alert("Vous ne pouvez pas avoir plus de 10 produits dans votre panier.");
      return false;
    }

    // On décompose la commande en articles unitaires
    for (let i = 0; i < produit.quantite; i++) {
      const article = {
        produit: produit.produit,
        quantite: 1,
        prixTotal: produit.produit.prix // Prix unitaire
      };
      this.produitsPanier.push(article);
    }

    this.sauvegarderPanier();
    return true;
  }

  viderPanier(): void {
    this.produitsPanier = [];
    this.sauvegarderPanier();
  }

  getPanier() { //recuperer le panier
    return this.produitsPanier;
  }

  getNombreArticlesTotal(): number {
    return this.produitsPanier.reduce((total, item) => total + (item.quantite || 0), 0);
  }

  supprimerArticle(index: number) {
    this.produitsPanier.splice(index, 1);
    this.sauvegarderPanier();
  }
}
