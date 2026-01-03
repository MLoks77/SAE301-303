// maxime derènes

import { Component, AfterViewInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink, Router } from '@angular/router';
import Chart from 'chart.js/auto'; // sans ça sa affiche pas
import { CommonModule } from '@angular/common';

import { ConnexionApi } from '../../services/connexionAPI/connexion-api';



@Component({
  selector: 'app-stats',
  imports: [Navbar, Footer, RouterLink, CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements AfterViewInit {

  constructor(private connexionApi: ConnexionApi, private router: Router) { }

  weeklyChart: Chart | undefined;
  hourlyChart: Chart | undefined;

  METRIQUES: any[] = [];
  plats_populaires: any[] = [];
  donnees_hebdomadaires: any[] = [];
  donnees_horaires: any[] = [];

  ngAfterViewInit(): void {
    this.loadData();
  }

  OuvrirBonModal(idProduit: number) {
    this.router.navigate(['/menus'], { queryParams: { ouvrirModal: idProduit } });
  }

  loadData() {
    this.connexionApi.getStats().subscribe({
      next: (res: any) => {

        this.METRIQUES = [
          { label: 'Commandes aujourd\'hui', value: res.metrics.orders_today },
          { label: 'Commandes au total', value: Number(res.metrics.total_commandes) },
          { label: 'Note clients', value: res.metrics.rating },
        ];


        this.plats_populaires = res.popular_dishes.map((pp: any) => ({
          name: pp.nom,
          image: '/images/box/' + pp.image + '.jpg',
          orders: Number(pp.orders),
          price: '€' + Number(pp.prix).toFixed(2) // toFixed(2) pour avoir 2 chiffres après la virgule = .00
        }));

        this.donnees_hebdomadaires = res.weekly_data.map((w: any) => ({
          day: w.day,
          orders: Number(w.orders),
          revenue: Number(w.revenue)
        }));

        this.donnees_horaires = res.hourly_data.map((h: any) => ({
          hour: h.hour + ':00',
          orders: Number(h.orders)
        }));

        this.renderWeekly();
        this.renderHourly();
      },
      error: (err) => {
        console.error('Erreur chargement stats:', err);
      }
    });
  }

  renderWeekly() {
    const ctx = document.getElementById('weeklyChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.weeklyChart) this.weeklyChart.destroy();

    this.weeklyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [{
          label: 'Revenue hebdomadaire',
          data: this.donnees_hebdomadaires.map(d => d.revenue),
          borderColor: '#F64F4F',
          backgroundColor: 'rgba(139,0,0,0.2)',
          fill: true,
          tension: 0.5, // pour avoir un graphique avec des courbes
          borderWidth: 1 // width des courbes
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: number | string) => {
                const n = typeof value === 'number' ? value : Number(value);
                return '€' + n;
              }
            }
          }
        }
      }
    });
  }

  renderHourly() {
    const ctx = document.getElementById('hourlyChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.hourlyChart) this.hourlyChart.destroy();

    this.hourlyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.donnees_horaires.map(d => d.hour),
        datasets: [{
          label: 'Commandes par heure',
          data: this.donnees_horaires.map(d => d.orders),
          borderRadius: 4,
          backgroundColor: this.donnees_horaires.map(entry => {
            const hour = parseInt(entry.hour);
            if (hour >= 8 && hour <= 12) return '#1a1a1a'; // matin
            if (hour >= 12 && hour <= 18) return '#F64F4F'; // après midi
            if (hour >= 18 && hour <= 24) return '#2a136eff'; // soir
            return '#e5e5e5';
          })
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}