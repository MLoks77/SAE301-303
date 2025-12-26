import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cookiecard } from './components/cookiecard/cookiecard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cookiecard],
  templateUrl: './app.html',
  styleUrl: 'styles/css/styles.css'
})
export class App {
  protected readonly title = signal('sushngo');
}
