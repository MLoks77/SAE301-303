import { Component, OnInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
import { RecupBox } from '../../recup-box';
@Component({
  selector: 'app-pagemenu',
  imports: [RouterLink, Footer, Navbar],
  templateUrl: './pagemenu.html',
  styleUrl: './pagemenu.css',
})
export class Pagemenu implements OnInit{
  boxData: any;
  apiData: any;

  constructor(private recupBox: RecupBox) {
    this.boxData = this.recupBox.boxData;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.recupBox.getBoxDataFromApi().subscribe((res=>{
      this.apiData=res;
    }))
  }
}
