import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ConnexionApi } from '../../services/connexionAPI/connexion-api';


@Component({
  selector: 'app-pagemenu',
  imports: [RouterLink, Footer, Navbar, CommonModule],
  templateUrl: './pagemenu.html',
  styleUrl: './pagemenu.css',
})
export class Pagemenu {

  carrousel = [
    {
      id: 1,
      image: '/images/assets/sushi1.webp',
      link: '/compte',
    },
    {
      id: 2,
      image: '/images/assets/sushi1.webp',
      link: '/statistiques',
    },
    {
      id: 3,
      image: '/images/assets/sushi1.webp',
      link: '/menus/#',
    }
  ];

  listeBoxes: any[] = [];
  listeFiltree: any[] = []; // La liste qu'on affiche vraiment

  filtresDisponibles: string[] = []; // Liste de tous les ingrédients possibles
  filtresSelectionnes: string[] = []; // Les ingrédients cochés par l'utilisateur
  afficherFiltres: boolean = false;   // Pour ouvrir/fermer le menu

  apiData: any;
  boxData: any;

  boxSelectionnee: any = null; // La box sur laquelle on a cliqué

  ouvrirModal(box: any) {
    this.boxSelectionnee = box;
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
            description: item.saveurs, // On garde saveurs en description pour la card
            saveurs: item.saveurs,
            aliments: item.aliments,
            pieces: item.pieces,
            prix: Number(item.prix).toFixed(2) + '€',
            image: '/images/box/' + item.image + '.jpg'
          }));

          // 1. On initialise la liste filtrée avec TOUT au début
          this.listeFiltree = [...this.listeBoxes];

          // 2. On récupère tous les ingrédients pour créer les filtres
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
      if (box.description) {
        // On sépare par les virgules (ex: "saumon, avocat" -> ["saumon", "avocat"])
        const mots = box.description.split(',').map((mot: string) => mot.trim()); //split =une virgule = un element du tableau et trim = supprime les espaces
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

  appliquerFiltres() {
    // Si aucun filtre coché, on montre tout
    if (this.filtresSelectionnes.length === 0) {
      this.listeFiltree = [...this.listeBoxes]; // [...this.listeBoxes] = copie telle quelle de la listeBoxes
      return;
    }

    this.listeFiltree = this.listeBoxes.filter(box => { //parcourt la listeBoxes
      return this.filtresSelectionnes.every(filtre => //parcourt le tableau des filtres cochés, et affiche seulement les boxes dont tous les filtres cochés sont présents dans la liste des ingrédients de la description
        box.description && box.description.includes(filtre)
      );
    });
  }

  activeCarrouselIndex = 0;
  carrouselLength = 3;
  carrouselInterval: any;

  startCarrouselAutoSlide() {
    this.carrouselInterval = setInterval(() => {
      this.activeCarrouselIndex = (this.activeCarrouselIndex + 1) % this.carrouselLength;
    }, 2500);
  }

  setCarrouselIndex(i: number) {
    this.activeCarrouselIndex = i;
  }


  ngOnDestroy(): void {
    if (this.carrouselInterval) {
      clearInterval(this.carrouselInterval);
    }
  }
}
