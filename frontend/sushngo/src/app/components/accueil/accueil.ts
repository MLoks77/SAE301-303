
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, Navbar, Footer, CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})

export class Accueil {

  plats = [
    {
      id: 1,
      name: 'Toro Sashimi',
      description: 'Thon premium, finement tranché.',
      price: '€24',
      image:
        '/images/assets/sushi1.webp',
      link: '/menus', // mettre un id
    },
    {
      id: 2,
      name: 'Uni Nigiri',
      description: 'Oursin frais d’Hokkaido, croustillant et savoureux.',
      price: '€18',
      image:
        '/images/assets/sushi2.webp',
      link: '/menus', // mettre un id
    },
    {
      id: 3,
      name: 'Wagyu Roll',
      description: 'Bœuf Wagyu poêlé, huile de truffe, asperges.',
      price: '€32',
      image:
        '/images/assets/sushi3.webp',
      link: '/menus', // mettre un id
    },
    {
      id: 4,
      name: 'Omakase Set',
      description: "Sélection du chef : 12 pièces de saison.",
      price: '€85',
      image:
        '/images/assets/sushi4.webp',
      link: '/menus', // mettre un id
    },
  ];


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

