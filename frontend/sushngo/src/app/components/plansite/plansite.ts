import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-plansite',
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './plansite.html',
  styleUrl: './plansite.css',
})
export class Plansite {

}
