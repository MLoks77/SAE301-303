import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-panier',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier {

}
