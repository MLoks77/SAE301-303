import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-utilisationcookie',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './utilisationcookie.html',
  styleUrl: './utilisationcookie.css',
})
export class Utilisationcookie {

}
