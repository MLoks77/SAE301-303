import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Inscconnex } from './components/inscconnex/inscconnex';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Inscconnex],
  templateUrl: './app.html',
  styleUrl: 'styles/css/styles.css'
})
export class App {
  protected readonly title = signal('sushngo');
}
