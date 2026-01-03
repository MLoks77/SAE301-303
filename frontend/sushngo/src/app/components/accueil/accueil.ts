
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar'
import { CommonModule } from '@angular/common';

import { ConnexionApi } from '../../services/connexionAPI/connexion-api';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, Navbar, Footer, CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})

// maxime derènes

export class Accueil {

  plats = [
    {
      id: 1,
      name: 'Master Mix',
      description: 'Thon premium, finement tranché.',
      price: '15.90€',
      image:
        '/images/assets/sushi1.webp',
    },
    {
      id: 2,
      name: 'Sunrise',
      description: 'Oursin frais d’Hokkaido, croustillant et savoureux.',
      price: '15.90€',
      image:
        '/images/assets/sushi2.webp',
    },
    {
      id: 3,
      name: 'Sando Box Chicken Katsu',
      description: 'Poulet Katsu, sauce teriyaki, riz',
      price: '15.90€',
      image:
        '/images/assets/sushi3.webp',
    },
    {
      id: 4,
      name: 'California Dream',
      description: 'Spicy saumon, thon, crevette, viande et avocat.',
      price: '19.90€',
      image:
        '/images/assets/sushi4.webp',
    },
  ];

  Boxes: any[] = [];

  constructor(private connexionApi: ConnexionApi) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.connexionApi.getUserDataFromApi().subscribe({ //sert a appeler l'api
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.Boxes = res.map((item: any) => ({ //ajoute a Boxes les données de l'API
            nom: item.nom,
            image: '/images/box/' + item.image + '.jpg'
          }));
        }
      },
      error: (err: any) => {
      }
    });
  }

  // ngAfterViewInit parce qu'à ce moment le DOM du composant est prêt ( à tout load )

  ngAfterViewInit() {
    const slider = document.getElementById('carousel-scroll');
    if (!slider) return;

    let Bas = false;
    let debutX: number = 0;
    let scrollLeft: number = 0;

    // Souris
    slider.addEventListener('mousedown', (e: MouseEvent) => {
      Bas = true;
      slider.classList.add('cursor-grabbing');
      debutX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      e.preventDefault();
    });

    slider.addEventListener('mouseleave', () => {
      Bas = false;
      slider.classList.remove('cursor-grabbing');
    });

    slider.addEventListener('mouseup', () => {
      Bas = false;
      slider.classList.remove('cursor-grabbing');
    });

    slider.addEventListener('mousemove', (e: MouseEvent) => {
      if (!Bas) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - debutX) * 1;
      slider.scrollLeft = scrollLeft - walk;
    });

    let startTouchX = 0;
    let startScrollLeft = 0;

    slider.addEventListener('touchstart', (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startTouchX = e.touches[0].pageX;
      startScrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const moveX = e.touches[0].pageX;
      const walk = (moveX - startTouchX) * 1;
      slider.scrollLeft = startScrollLeft - walk;
    });
  }

}

