import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-compte',
  imports: [Navbar, Footer, RouterModule],
  templateUrl: './compte.html',
  styleUrl: './compte.css',
})
export class Compte {

}
