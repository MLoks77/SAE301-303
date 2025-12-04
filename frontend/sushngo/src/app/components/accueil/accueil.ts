
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar'

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {

}
