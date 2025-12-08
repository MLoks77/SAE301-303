
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

  dishes = [
    {
      id: 1,
      name: 'Toro Sashimi',
      description: 'Premium fatty tuna belly, delicately sliced.',
      price: '€24',
      image:
        'https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Uni Nigiri',
      description: 'Fresh sea urchin from Hokkaido, crisp nori.',
      price: '€18',
      image:
        'https://images.unsplash.com/photo-1617196034438-61e8c128373e?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Wagyu Roll',
      description: 'Seared A5 Wagyu beef, truffle oil, asparagus.',
      price: '€32',
      image:
        'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 4,
      name: 'Omakase Set',
      description: "Chef's selection of 12 seasonal pieces.",
      price: '€85',
      image:
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1000&auto=format&fit=crop',
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

