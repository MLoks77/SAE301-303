import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookiecard',
  imports: [RouterLink],
  templateUrl: './cookiecard.html',
  styleUrl: './cookiecard.css',
})
export class Cookiecard {
  accepterCookies() {
    console.log('Les cookies ont été acceptés. Miam !');
    
  }
  refuserCookies() {
    console.log('Les cookies ont été refusés. Oh non !');
  }
}
