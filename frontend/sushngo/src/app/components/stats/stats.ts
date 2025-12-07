import { Component, AfterViewInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
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
    { label: "Today's Orders", value: '142', change: '+12%', trend: 'up', icon: '🍣' },
    { label: 'Total Revenue', value: '¥245,000', change: '+8%', trend: 'up', icon: '💹' },
    { label: 'Customer Rating', value: '4.9', change: '+0.1', trend: 'up', icon: '⭐' },
    { label: 'Active Reservations', value: '28', change: '-2', trend: 'down', icon: '👥' }
  ];

  POPULAR_DISHES = [
    { name: 'Salmon Nigiri', orders: 84, price: '¥600' },
    { name: 'Dragon Roll', orders: 72, price: '¥1400' },
    { name: 'Spicy Tuna', orders: 65, price: '¥850' },
    { name: 'Miso Soup', orders: 58, price: '¥300' },
    { name: 'Tuna Sashimi', orders: 45, price: '¥1200' }
  ];

  WEEKLY_DATA = [
    { day: 'Mon', orders: 95, revenue: 145000 },
    { day: 'Tue', orders: 110, revenue: 168000 },
    { day: 'Wed', orders: 125, revenue: 192000 },
    { day: 'Thu', orders: 115, revenue: 178000 },
    { day: 'Fri', orders: 180, revenue: 285000 },
    { day: 'Sat', orders: 210, revenue: 340000 },
    { day: 'Sun', orders: 160, revenue: 255000 }
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
                return '¥' + (n / 1000) + 'k';
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