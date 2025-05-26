import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkPlace } from '../models/work-place';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkPlacesService {
  private apiUrl = 'https://localhost:7155/api/WorksPlaces';

  constructor(private http: HttpClient) {}

  getAll(): Observable<WorkPlace[]> {
    return this.http.get<WorkPlace[]>(this.apiUrl);
  }
  insertWork(workplace: any){
    return this.http.post<WorkPlace>(`${this.apiUrl}`, workplace);
  }
  getById(id: string) {
  return this.http.get<WorkPlace>(`${this.apiUrl}/${id}`);
}

delete(id: string) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
bookPlace(id: string, booking: { userEmail: string; data: Date; orarioInizio: string; orarioFine: string }) {
  return this.http.post(`https://localhost:7155/api/Booking/${id}/book/post`, booking);
}

}
