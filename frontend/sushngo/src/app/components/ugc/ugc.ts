import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-ugc',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './ugc.html',
  styleUrl: './ugc.css',
})
export class Ugc {

}
