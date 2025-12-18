import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-compte',
  imports: [Navbar, Footer],
  templateUrl: './compte.html',
  styleUrl: './compte.css',
})
export class Compte {

}
