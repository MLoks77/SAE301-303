import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';

interface City {
  id: number;
  name: string;
  x: number; //emplacement en x (sur la page)
  y: number; //emplacement en y (sur la page)
  lat: number; //latitude de la ville
  lon: number; //longitude de la ville
}

interface Restaurant {
  id: number;
  name: string;
  adresse: string;
  cityId: number;
  lat: number; //latitude du restaurant
  lon: number; //longitude du restaurant
  distance?: number; //calcule la distance en km
}

@Component({
  selector: 'app-pointsretraits',
  standalone: true,
  imports: [Navbar, Footer, RouterLink, CommonModule],
  templateUrl: './pointsretraits.html',
  styleUrl: './pointsretraits.css',
})
export class Pointsretraits implements OnInit {
  selectedCity: City | null = null; //ville sélectionnée nulle par défaut
  userLat: number | null = null; //latitude de l'utilisateur nulle par défaut
  userLon: number | null = null; //longitude de l'utilisateur nulle par défaut
  errorMsg: string = '';

  //Villes françaises 
  cities: City[] = [
    { id: 1, name: 'Paris', x: 56, y: 26, lat: 48.8566, lon: 2.3522 }, // id + nom ville + posX + posY + latitude ville + longitude ville
    { id: 2, name: 'Lyon', x: 70, y: 66, lat: 45.7640, lon: 4.8357 },
    { id: 3, name: 'Marseille', x: 75, y: 94, lat: 43.2965, lon: 5.3698 },
    { id: 4, name: 'Bordeaux', x: 27, y: 70, lat: 44.8378, lon: -0.5792 },
    { id: 5, name: 'Lille', x: 65, y: 13, lat: 50.6292, lon: 3.0573 },
    { id: 6, name: 'Toulouse', x: 40, y: 82, lat: 43.6047, lon: 1.4442 },
    { id: 7, name: 'Meaux', x: 65, y: 26, lat: 48.95893, lon: 2.91789 }
  ];

  //Adresses des restaurants
  allRestaurants: Restaurant[] = [
    { id: 101, name: 'Sush\'n go Meaux', adresse: '17 Rue Jablinot , 77100 Meaux', cityId: 7, lat: 48.95486, lon: 2.87795 },
    { id: 102, name: 'Sush\'n go Paris', adresse: '50 Boulevard du Montparnasse, 75015 Paris', cityId: 1, lat: 48.8421, lon: 2.3219 },
    { id: 201, name: 'Sush\'n go Lyon', adresse: '15 Place Bellecour, 69002 Lyon', cityId: 2, lat: 45.7578, lon: 4.8322 },
    { id: 301, name: 'Sush\'n go Marseille', adresse: '22 Quai du Port, 13002 Marseille', cityId: 3, lat: 43.2954, lon: 5.3744 },
    { id: 401, name: 'Sush\'n go Bordeaux', adresse: '5 Rue Sainte-Catherine, 33000 Bordeaux', cityId: 4, lat: 44.8404, lon: -0.5700 },
    { id: 501, name: 'Sush\'n go Lille', adresse: '10 Place de la Gare, 59000 Lille', cityId: 5, lat: 50.6366, lon: 3.0705 },
    { id: 601, name: 'Sush\'n go Toulouse', adresse: '17 Rue des Azes, 31000 Toulouse', cityId: 6, lat: 43.59484, lon: 1.44544 }
  ];

  filteredRestaurants: Restaurant[] = []; //restaurants filtrés en fonction de la ville selectionnée

  ngOnInit() {
    this.getUserLocation(); //demande la localisation dès qu'on arrive sur le composant
  }

  getUserLocation() { //fonction pour demander la localisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLon = position.coords.longitude;
          if (this.selectedCity) {
            this.updateDistances();// recalculer les distances si une ville est déjà selectionnée
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          this.setDefaultLocation(); // Fallback vers Meaux
        }
      );
    } else {
      this.setDefaultLocation(); // Fallback vers Meaux
    }
  }

  setDefaultLocation() {
    // Coordonnées de l'IUT de Meaux
    this.userLat = 48.9567;
    this.userLon = 2.8913;
    this.errorMsg = "Géolocalisation non disponible.";

    if (this.selectedCity) {
      this.updateDistances();
    }
  }

  selectCity(city: City) {
    this.selectedCity = city; //mémorise la ville sélectionnée
    this.filteredRestaurants = this.allRestaurants.filter(r => r.cityId === city.id); // garde les restaurants de la ville selectionnée
    this.updateDistances();
  }

  onCityChange(event: any) {
    const cityId = parseInt(event.target.value, 10);
    const selectedCity = this.cities.find(c => c.id === cityId);
    if (selectedCity) {
      this.selectCity(selectedCity);
    }
  }

  updateDistances() { // met à jour les distances 
    if (this.userLat !== null && this.userLon !== null) {
      this.filteredRestaurants.forEach(r => {
        r.distance = this.calculateDistance(this.userLat!, this.userLon!, r.lat, r.lon);
      });
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number { //trouvé sur internet pour calculer les distances
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.deg2rad(lat2 - lat1); // différence de latitude
    const dLon = this.deg2rad(lon2 - lon1); // différence de longitude
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance en km
    return Math.round(d * 10) / 10; // Arrondi à 1 décimale
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180); // Conversion de degrés en radians
  }
}
