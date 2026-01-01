import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ConnexionApi } from '../../services/connexionAPI/connexion-api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagemenu',
  imports: [RouterLink, Footer, Navbar, CommonModule, FormsModule],
  templateUrl: './pagemenu.html',
  styleUrl: './pagemenu.css',
})
export class Pagemenu {

  carrousel: any[] = [
    {
      id: 1,
      image: '/images/assets/image_sushi_1.jpg',
      link: '/accueil',
      position: 'center 60%',
    },
    {
      id: 2,
      image: '/images/assets/image_sushi_2.jpg',
      link: '/accueil',
      position: 'center 55%'
    },
    {
      id: 3,
      image: '/images/assets/image_sushi_3.jpg',
      link: '/accueil',
      position: 'center',
    }
  ];

  listeBoxes: any[] = [];
  listeFiltree: any[] = []; // La liste qu'on affiche vraiment

  filtresDisponibles: string[] = []; // Liste de tous les ingrédients possibles
  filtresSelectionnes: string[] = []; // Les ingrédients cochés par l'utilisateur
  triSelectionne: string = ''; // 'croissant' | 'decroissant' | ''
  afficherFiltres: boolean = false;   // Pour ouvrir/fermer le menu

  apiData: any;
  boxData: any;

  boxSelectionnee: any = null; // La box sur laquelle on a cliqué
  quantiteSelectionnee: number = 1; // Quantité par défaut

  ouvrirModal(box: any) {
    this.boxSelectionnee = box; // Stocke la box cliquée
    this.quantiteSelectionnee = 1; // On remet la quantité à 1 à chaque ouverture 

    // saveurs
    if (this.boxSelectionnee.saveurs) { // On verifie si la box a des saveurs 
      this.boxSelectionnee.saveursListe = this.boxSelectionnee.saveurs.split(',').map((s: any) => s.trim()); //On transforme la liste des saveurs en tableau
    } else {
      this.boxSelectionnee.saveursListe = []; //si on a pas de saveurs , on renvoie un tableau vide
    }

    // aliments
    if (this.boxSelectionnee.aliments) { // On verifie si la box a des aliments 
      this.boxSelectionnee.alimentsListe = this.boxSelectionnee.aliments.split(';').map((s: any) => s.trim()); //On transforme la liste des aliments en tableau
    } else {
      this.boxSelectionnee.alimentsListe = []; //si on a pas d'aliments , on renvoie un tableau vide
    }

    // Ajout factice d'allergènes
    this.boxSelectionnee.allergenesListe = ['Poisson', 'Soja', 'Sésame', 'Gluten'];
  }

  fermerModal() {
    this.boxSelectionnee = null;

  }

  constructor(private connexionApi: ConnexionApi) { }

  ngOnInit(): void {
    this.getData();
    this.startCarrouselAutoSlide();
  }

  getData() {
    this.connexionApi.getUserDataFromApi().subscribe({ //sert a appeler l'api
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.listeBoxes = res.map((item: any) => ({ //ajoute a ListeBoxes les données de l'API en transformant leurs noms
            id: item.id_produit,
            nom: item.nom,
            description: item.description,
            saveurs: item.saveurs,
            aliments: item.aliments,
            pieces: item.pieces,
            prix: Number(item.prix).toFixed(2),
            image: '/images/box/' + item.image + '.jpg'
          }));

          // On initialise la liste filtrée avec TOUT au début
          this.listeFiltree = [...this.listeBoxes];

          // On récupère tous les ingrédients pour créer les filtres
          this.extraireFiltres();
        } else {
        }
        this.apiData = res;
        this.boxData = res;
      },
      error: (err: any) => {
      }
    });
  }

  extraireFiltres() {
    const tousLesMots = new Set<string>(); //une sorte de tableau qui ne peut pas avoir de doublons

    this.listeBoxes.forEach(box => {
      if (box.saveurs) {
        const mots = box.saveurs.split(',').map((mot: string) => mot.trim()); //split => une virgule = un element du tableau et trim = supprime les espaces
        mots.forEach((mot: string) => tousLesMots.add(mot)); //ajoute chaque mot au set
      }
    });

    this.filtresDisponibles = Array.from(tousLesMots).sort(); //transforme le set en tableau et le trie 
  }

  // Affiche ou cache le menu filtres
  toggleMenuFiltres() {
    this.afficherFiltres = !this.afficherFiltres;
  }

  // sélectionner un ingrédient
  gererFiltre(filtre: string) {
    if (this.filtresSelectionnes.includes(filtre)) { //parcourt le tableau et vérifie si le filtre est déjà dedans
      this.filtresSelectionnes = this.filtresSelectionnes.filter(f => f !== filtre); //si déjà coché, on le supprime
    } else {
      this.filtresSelectionnes.push(filtre); // Sinon on l'ajoute
    }
    // Après avoir changé la sélection, on met à jour la liste affichée
    this.appliquerFiltres();
  }

  gererTri(tri: string) {
    if (this.triSelectionne === tri) {
      this.triSelectionne = ''; // Si on clique sur le même, on désactive
    } else {
      this.triSelectionne = tri;
    }
    this.appliquerFiltres();
  }

  appliquerFiltres() {
    // Si aucun filtre coché, on montre tout (mais on garde le tri !)
    let resultat = [...this.listeBoxes];

    if (this.filtresSelectionnes.length > 0) {
      resultat = this.listeBoxes.filter(box => {
        return this.filtresSelectionnes.every(filtre =>
          box.description && box.description.includes(filtre)
        );
      });
    }

    // Application du tri
    if (this.triSelectionne === 'croissant') {
      resultat.sort((a, b) => parseFloat(a.prix) - parseFloat(b.prix));
    } else if (this.triSelectionne === 'decroissant') {
      resultat.sort((a, b) => parseFloat(b.prix) - parseFloat(a.prix));
    }

    this.listeFiltree = resultat;
  }

  activeCarrouselIndex = 0;
  carrouselLength = 3;
  carrouselInterval: any;

  startCarrouselAutoSlide() {
    this.carrouselInterval = setInterval(() => {
      this.activeCarrouselIndex = (this.activeCarrouselIndex + 1) % this.carrouselLength;
    }, 4500);
  }

  setCarrouselIndex(i: number) {
    this.activeCarrouselIndex = i;
  }

  ngOnDestroy(): void {
    if (this.carrouselInterval) {
      clearInterval(this.carrouselInterval);
    }
  }

  getPrixTotal() {
    if (!this.boxSelectionnee) return 0; // tant que rien n'est sélectionné , retourner 0
    return (this.boxSelectionnee.prix * this.quantiteSelectionnee).toFixed(2);
  }
}
