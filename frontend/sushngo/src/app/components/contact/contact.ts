import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-contact',
  imports: [ RouterLink , Navbar],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

}
