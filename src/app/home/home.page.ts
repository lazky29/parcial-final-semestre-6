import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data'; // Conexión con tu servicio modular
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSpinner, IonRefresher, IonRefresherContent,
  IonGrid, IonRow, IonCol // Componentes obligatorios para renderizar la cuadrícula gamer
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSpinner, IonRefresher, IonRefresherContent,
    IonGrid, IonRow, IonCol // Registro de componentes standalone requeridos por Angular
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
        // .slice(0, 50) recorta y restringe la lista a los primeros 50 elementos del examen
        const limitedData = data.slice(0, 50); 
        
        this.digimons = limitedData;
        this.filteredDigimons = limitedData;
        this.isLoading = false;
        
        if (event) {
          event.target.complete(); // Cierra la animación del Refresher nativo
        }
      },
      error: (error) => {
        console.error('Error cargando datos de la API:', error);
        this.isLoading = false;
        
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  buscarDigimon(event: any) {
    const texto = event.target.value.toLowerCase();
    if (texto && texto.trim() !== '') {
      // Filtrado ágil directamente sobre el arreglo local controlado de 50 elementos
      this.filteredDigimons = this.digimons.filter((digimon) => {
        return digimon.name.toLowerCase().indexOf(texto) > -1;
      });
    } else {
      this.filteredDigimons = this.digimons;
    }
  }

  verDetalle(digimon: any) {
    // Navegación nativa transmitiendo el objeto completo en el estado de la ruta
    this.router.navigate(['/detail', digimon.name], { state: { digimon } });
  }
}