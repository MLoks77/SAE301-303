import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // pour les requêtes HTTP
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [provideHttpClient()]
}).catch((err) => console.error(err));