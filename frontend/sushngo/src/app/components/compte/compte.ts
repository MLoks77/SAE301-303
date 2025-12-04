import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-compte',
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './compte.html',
  styleUrl: './compte.css',
})
export class Compte {

}
