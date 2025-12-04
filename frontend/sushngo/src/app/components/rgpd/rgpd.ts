import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-rgpd',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './rgpd.html',
  styleUrl: './rgpd.css',
})
export class Rgpd {

}
