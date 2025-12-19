import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';

import { HttpClient } from '@angular/common/http'; // pour api ( maxime derènes )
import { Router } from '@angular/router'; // pour api ( maxime derènes )

@Component({
  selector: 'app-panier',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier {

}
