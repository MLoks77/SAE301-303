import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, RouterLink],
  templateUrl: './app.html',
  styleUrl: 'styles/css/styles.css'
})
export class App {
  protected readonly title = signal('sushngo');
}
