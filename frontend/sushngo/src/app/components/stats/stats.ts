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
          id: pp.id_produit,
          name: pp.nom,
          image: '/images/box/' + pp.image + '.jpg',
          orders: Number(pp.orders),
          price: '€' + Number(pp.prix).toFixed(2) // toFixed(2) pour avoir 2 chiffres après la virgule = .00
        }));

        this.donnees_hebdomadaires = res.weekly_data.map((w: any) => ({
          day: w.day_name,
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
    if (!ctx || !this.donnees_hebdomadaires.length) return;

    if (this.weeklyChart) this.weeklyChart.destroy();

    // On traduit les jours vu qu'on utilise pas l'extension pour
    const joursTraduits: { [key: string]: string } = {
      'Mon': 'Lun', 'Tue': 'Mar', 'Wed': 'Mer', 'Thu': 'Jeu',
      'Fri': 'Ven', 'Sat': 'Sam', 'Sun': 'Dim'
    };

    const labels = this.donnees_hebdomadaires.map(d => joursTraduits[d.day] || d.day);
    const dataValues = this.donnees_hebdomadaires.map(d => d.revenue);

    this.weeklyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels, // Utilise les jours réels des 7 derniers jours
        datasets: [{
          label: 'Revenue hebdomadaire',
          data: dataValues,
          borderColor: '#F64F4F',
          backgroundColor: 'rgba(139,0,0,0.2)',
          fill: true,
          tension: 0.5,
          borderWidth: 2
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
            if (hour >= 9 && hour <= 12) return '#323E2E'; // matin
            if (hour >= 13 && hour <= 18) return '#F64F4F'; // après midi
            if (hour >= 19 && hour <= 24) return '#E44240'; // soir
            if (hour >= 1 && hour < 8) return '#555555'; // nuit
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