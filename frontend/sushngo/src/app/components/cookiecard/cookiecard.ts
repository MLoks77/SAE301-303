import { Component } from '@angular/core';

@Component({
  selector: 'app-cookiecard',
  imports: [],
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
