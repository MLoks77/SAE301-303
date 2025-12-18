import { Component, AfterViewInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto'; // sans ça sa affiche pas
import { CommonModule } from '@angular/common';

// en attendant que je connecte l'api et le fasse correctement je met ça


@Component({
  selector: 'app-stats',
  imports: [Navbar, Footer, RouterLink, CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements AfterViewInit {

  METRICS = [
    { label: "Commandes aujourd'hui", value: '142' },
    { label: 'Revenu total', value: '€2 450,00' },
    { label: 'Note clients', value: '4.9' },
    { label: 'Réservations actives', value: '28' }
  ];

  POPULAR_DISHES = [
    { name: 'Saumon Nigiri', orders: 84, price: '€6,00' },
    { name: 'Dragon Roll', orders: 72, price: '€14,00' },
    { name: 'Thon Épicé', orders: 65, price: '€8,50' },
    { name: 'Soupe Miso', orders: 58, price: '€3,00' },
    { name: 'Sashimi Thon', orders: 45, price: '€12,00' }
  ];

  WEEKLY_DATA = [
    { day: 'Lun', orders: 95, revenue: 1450 },
    { day: 'Mar', orders: 110, revenue: 1680 },
    { day: 'Mer', orders: 125, revenue: 1920 },
    { day: 'Jeu', orders: 115, revenue: 1780 },
    { day: 'Ven', orders: 180, revenue: 2850 },
    { day: 'Sam', orders: 210, revenue: 3400 },
    { day: 'Dim', orders: 160, revenue: 2550 }
  ];

  HOURLY_DATA = [
    { hour: '11:00', orders: 12 },
    { hour: '12:00', orders: 45 },
    { hour: '13:00', orders: 38 },
    { hour: '14:00', orders: 20 },
    { hour: '15:00', orders: 15 },
    { hour: '16:00', orders: 18 },
    { hour: '17:00', orders: 35 },
    { hour: '18:00', orders: 65 },
    { hour: '19:00', orders: 82 },
    { hour: '20:00', orders: 55 },
    { hour: '21:00', orders: 30 }
  ];

  ngAfterViewInit(): void {
    this.renderWeeklyChart();
    this.renderHourlyChart();
  }

  renderWeeklyChart() {
    const ctx = document.getElementById('weeklyChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.WEEKLY_DATA.map(d => d.day),
        datasets: [{
          label: 'Revenue',
          data: this.WEEKLY_DATA.map(d => d.revenue),
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
            ticks: {
              callback: (value: number | string) => {
                const n = typeof value === 'number' ? value : Number(value);
                return '€' + (n / 1000) + 'k';
              }
            }
          }
        }
      }
    });
  }

  renderHourlyChart() {
    const ctx = document.getElementById('hourlyChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.HOURLY_DATA.map(d => d.hour),
        datasets: [{
          data: this.HOURLY_DATA.map(d => d.orders),
          borderRadius: 4,
          backgroundColor: this.HOURLY_DATA.map(entry => {
            const hour = parseInt(entry.hour);
            if (hour >= 12 && hour <= 14) return '#1a1a1a'; // Lunch
            if (hour >= 18 && hour <= 20) return '#8B0000'; // Dinner
            return '#e5e5e5'; // Default
          })
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }
}