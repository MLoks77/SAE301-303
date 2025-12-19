import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // pour api ( maxime derènes )
import { Router } from '@angular/router'; // pour api ( maxime derènes )

@Component({
  selector: 'app-mdpoublie',
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './mdpoublie.html',
  styleUrl: './mdpoublie.css',
})
export class Mdpoublie {

}
