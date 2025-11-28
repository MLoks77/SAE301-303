import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
<<<<<<< HEAD
import { Inscconnex } from './components/inscconnex/inscconnex';
import { Cookiecard } from './components/cookiecard/cookiecard';
import { Plansite } from './components/plansite/plansite';
import { Contact } from './components/contact/contact';
=======
>>>>>>> 507a8e4e731c5d1ee60d08846ecb9ac8ef60710b

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: 'styles/css/styles.css'
})
export class App {
  protected readonly title = signal('sushngo');
}
