import { Component, OnInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
import { RecupBox } from '../../services/recupBOX/recup-box';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagemenu',
  imports: [RouterLink, Footer, Navbar, CommonModule],
  templateUrl: './pagemenu.html',
  styleUrl: './pagemenu.css',
})
export class Pagemenu implements OnInit {

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

  boxData: any;
  apiData: any;

  constructor(private recupBox: RecupBox) {
    this.boxData = this.recupBox.boxData;
  }

  ngOnInit(): void {
    this.getData();
    this.startCarrouselAutoSlide();
  }

  getData() {
    this.recupBox.getBoxDataFromApi().subscribe((res => {
      this.apiData = res;
    }))
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
