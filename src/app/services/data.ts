import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://digimon-api.vercel.app/api/digimon';

  constructor(private http: HttpClient) { }

  getDigimons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Petición GET [Módulo A-3]
  }
}