import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data'; // Apunta exactamente a tu archivo data.ts
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonAvatar, IonLabel, IonSearchbar, IonSpinner, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
    IonAvatar, IonLabel, IonSearchbar, IonSpinner, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol
  ]
})
export class HomePage implements OnInit {
  digimons: any[] = [];
  filteredDigimons: any[] = [];
  isLoading: boolean = true;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(event?: any) {
    this.isLoading = true;
    this.dataService.getDigimons().subscribe({
      next: (data) => {
        this.digimons = data;
        this.filteredDigimons = data;
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (error) => {
        console.error('Error cargando datos', error);
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  buscarDigimon(event: any) {
    const texto = event.target.value.toLowerCase();
    if (texto && texto.trim() !== '') {
      // Filtro ágil directamente sobre el arreglo local [Módulo B-3]
      this.filteredDigimons = this.digimons.filter((digimon) => {
        return digimon.name.toLowerCase().indexOf(texto) > -1;
      });
    } else {
      this.filteredDigimons = this.digimons;
    }
  }

  verDetalle(digimon: any) {
    // Navegación nativa pasando el objeto en el estado [Módulo C-2]
    this.router.navigate(['/detail', digimon.name], { state: { digimon } });
  }
}