import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { Inscconnex } from './components/inscconnex/inscconnex';
import { Cookiecard } from './components/cookiecard/cookiecard';
import { Plansite } from './components/plansite/plansite';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: 'styles/css/styles.css'
})
export class App {
  protected readonly title = signal('sushngo');
}
