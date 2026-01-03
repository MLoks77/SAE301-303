import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';

// maxime derènes

@Component({
  selector: 'app-mentionslegales',
  imports: [Footer, Navbar, CommonModule, RouterLink],
  templateUrl: './mentionslegales.html',
  styleUrl: './mentionslegales.css',
})
export class Mentionslegales {


  currentTab: string = 'mentions';

  showTab(tab: string) {
    this.currentTab = tab;
  }
}
