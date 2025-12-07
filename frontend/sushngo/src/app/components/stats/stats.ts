import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-stats',
  imports: [Navbar, Footer],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {

}
