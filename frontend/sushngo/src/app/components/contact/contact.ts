import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, Navbar],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

}
