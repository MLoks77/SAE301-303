import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-pointsretraits',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './pointsretraits.html',
  styleUrl: './pointsretraits.css',
})
export class Pointsretraits {

}
