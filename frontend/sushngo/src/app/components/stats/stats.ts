// maxime derènes

import { Component, AfterViewInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
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

  constructor(private connexionApi: ConnexionApi) { }

  weeklyChart: Chart | undefined;
  hourlyChart: Chart | undefined;

  METRIQUES: any[] = [];
  plats_populaires: any[] = [];
  donnees_hebdomadaires: any[] = [];
  donnees_horaires: any[] = [];

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.connexionApi.getStats().subscribe({
      next: (res: any) => {
        // récupère le résultat de SELECT COUNT(*) FROM commande WHERE DATE(date_commande) = CURDATE()
        // récupère le résultat de SELECT SUM(prix_total) FROM commande
        this.METRIQUES = [
          { label: "Commandes aujourd'hui", value: res.metrics.orders_today },
          { label: 'Revenu total', value: '€' + Number(res.metrics.total_revenue).toFixed(2) },
          { label: 'Note clients', value: res.metrics.rating },
        ];

        // récupère les résultats de SELECT p.nom, SUM(d.quantite), p.prix FROM detail_commande d JOIN produit p ...
        this.plats_populaires = res.popular_dishes.map((pd: any) => ({
          name: pd.nom,
          orders: Number(pd.orders),
          price: '€' + Number(pd.prix).toFixed(2)
        }));

        // récupère les résultats de SELECT DATE_FORMAT(date_commande, '%a'), SUM(prix_total), COUNT(*) FROM commande ...
        this.donnees_hebdomadaires = res.weekly_data.map((w: any) => ({
          day: w.day,
          orders: Number(w.orders),
          revenue: Number(w.revenue)
        }));

        // récupère les résultats de SELECT HOUR(date_commande), COUNT(*) FROM commande ...
        this.donnees_horaires = res.hourly_data.map((h: any) => ({
          hour: h.hour + ':00',
          orders: Number(h.orders)
        }));

        this.renderWeeklyChart();
        this.renderHourlyChart();
      },
      error: (err) => {
        console.error('Erreur chargement stats:', err);
      }
    });
  }

  renderWeeklyChart() {
    const ctx = document.getElementById('weeklyChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.weeklyChart) this.weeklyChart.destroy();

    this.weeklyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.donnees_hebdomadaires.map(d => d.day),
        datasets: [{
          label: 'Revenue',
          data: this.donnees_hebdomadaires.map(d => d.revenue),
          borderColor: '#8B0000',
          backgroundColor: 'rgba(139,0,0,0.2)',
          fill: true,
          tension: 0.4,
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

  renderHourlyChart() {
    const ctx = document.getElementById('hourlyChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.hourlyChart) this.hourlyChart.destroy();

    this.hourlyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.donnees_horaires.map(d => d.hour),
        datasets: [{
          data: this.donnees_horaires.map(d => d.orders),
          borderRadius: 4,
          backgroundColor: this.donnees_horaires.map(entry => {
            const hour = parseInt(entry.hour);
            if (hour >= 12 && hour <= 14) return '#1a1a1a'; // matin
            if (hour >= 18 && hour <= 20) return '#8B0000'; // soir
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