import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mdpoublie',
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './mdpoublie.html',
  styleUrl: './mdpoublie.css',
})
export class Mdpoublie {

}
