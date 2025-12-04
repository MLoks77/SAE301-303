import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-pagemenu',
  imports: [RouterLink, Footer, Navbar],
  templateUrl: './pagemenu.html',
  styleUrl: './pagemenu.css',
})
export class Pagemenu {

}
