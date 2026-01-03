//Sebastian

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'; // map sert a transformer les données  tap sert a faire des actions sur les données
import { of } from 'rxjs'; // of sert a creer un observable et rxjs est une librairie d'observables

export interface User {
  id_user: number;
  nom: string;
  prenom: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  reponse?: string;
  message?: string;
  error?: string;
  api_token?: string;
  user?: User;
}

@Injectable({
  providedIn: 'root',
})
export class PanierService {

  produitsPanier: any[] = []; // Tableau des produits dans le panier
  private apiUrl = 'http://localhost/SAE301-303/backend/api/api.php';

  constructor(private http: HttpClient) { // Injected HttpClient
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
    let totalActuel = this.getNombreArticlesTotal();

    if (totalActuel + produit.quantite > 10) {
      alert("Vous ne pouvez pas avoir plus de 10 produits dans votre panier.");
      return false;
    }

    // Debug pour voir TOUTES les clés disponibles dans l'objet produit
    console.log("Contenu réel du produit :", produit.produit);

    // On cherche l'ID partout où il pourrait se cacher
    const id = produit.produit?.id || 
               produit.id;

    if (!id) {
      console.error("ERREUR CRITIQUE : Aucune clé 'id' ou 'id_produit' trouvée dans :", produit);
      alert("Erreur technique : Le produit n'a pas d'identifiant valide.");
      return false;
    }

    for (let i = 0; i < produit.quantite; i++) {
      const article = {
        produit: produit.produit,
        id_produit: id, // On stocke l'ID trouvé
        quantite: 1,
        prixTotal: produit.produit.prix
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

  getPanier() {
    return this.produitsPanier;
  }

  getNombreArticlesTotal(): number {
    return this.produitsPanier.reduce((total, item) => total + (item.quantite || 0), 0);
  }

  supprimerArticle(index: number) {
    this.produitsPanier.splice(index, 1);
    this.sauvegarderPanier();
  }

  // Joachim
  envoiBdd(envoiData: {date_commande: string; prix_total: number; mode: string; produits: {id_produit: number; quantite: number; }[]}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, {
      action: 'create-commande',
      date_commande: envoiData.date_commande,
      prix_total: envoiData.prix_total,
      mode: envoiData.mode,
      produits: envoiData.produits
    }, {
      withCredentials: true
    });
  }
}