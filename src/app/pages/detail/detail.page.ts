import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
  IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonBackButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
    IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonBackButton
  ]
})
export class DetailPage implements OnInit {
  digimonName: string | null = '';
  digimonData: any = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Recuperación óptima mediante ActivatedRoute [Módulo C-3]
    this.digimonName = this.route.snapshot.paramMap.get('name');

    // Recuperación del objeto completo desde el historial de estados
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.digimonData = navigation.extras.state['digimon'];
    }
  }
}