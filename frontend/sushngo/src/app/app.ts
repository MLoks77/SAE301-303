import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Inscconnex } from './components/inscconnex/inscconnex';
import { Cookiecard } from './components/cookiecard/cookiecard';
import { Plansite } from './components/plansite/plansite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: 'styles/css/styles.css'
})
export class App {
  protected readonly title = signal('sushngo');
}
