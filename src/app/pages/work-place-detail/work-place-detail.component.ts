import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkPlace } from '../../models/work-place';
import { WorkPlacesService } from '../../services/workplaces.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Booking } from '../../models/booking';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-workplace-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './work-place-detail.component.html',
  styleUrls: ['./work-place-detail.component.css']
})
export class WorkplaceDetailsComponent implements OnInit {
  place?: WorkPlace;
  bookingData: Booking = {
    userEmail: '',
    data: new Date(),
    orarioInizio: '',
    orarioFine: ''
  };
  activeTab: string = 'info';
  reviews: any[] = [];
  newReview = {
    userEmail: '',
    voto: 0,
    commento: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: WorkPlacesService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getById(id).subscribe({
        next: (data) => this.place = Array.isArray(data) ? data[0] : data,
        error: (err) => console.error('Errore caricamento dettagli:', err)
      });
    }
    this.http.get<any[]>(`https://localhost:7155/api/Review/${id}/get`)
      .subscribe({
        next: data => this.reviews = data,
        error: err => console.error('Errore caricamento recensioni:', err)
      });

  }

  deletePlace() {
    if (this.place && confirm('Are you sure you want to delete this workspace?')) {
      this.service.delete(this.place.id!).subscribe({
        next: () => {
          alert('Workspace deleted successfully.');
          this.router.navigate(['/explore']);
        },
        error: (err) => console.error('Errore eliminazione:', err)
      });
    }
  }
  bookNow() {
    if (!this.place?.id) return;

    this.service.bookPlace(this.place.id, this.bookingData).subscribe({
      next: () => alert('Booking successful!'),
      error: (err) => console.error('Booking failed:', err)
    });
    this.router.navigate(['/']);
  }
  isBookingTimeValid(): boolean {
  if (!this.place || !this.bookingData.data || !this.bookingData.orarioInizio || !this.bookingData.orarioFine) {
    return false;
  }

  const opening = this.place.orarioApertura;
  const closing = this.place.orarioChiusura;

  const selectedDate = new Date(this.bookingData.data);
  const startTime = new Date(`${this.bookingData.data}T${this.bookingData.orarioInizio}`);
  const endTime = new Date(`${this.bookingData.data}T${this.bookingData.orarioFine}`);
  const openingTime = new Date(`${this.bookingData.data}T${opening}`);
  const closingTime = new Date(`${this.bookingData.data}T${closing}`);

  return startTime >= openingTime && endTime <= closingTime && startTime < endTime;
}

  postReview() {
    if (!this.place || !this.place.id) return;

    const review = {
      userEmail: this.newReview.userEmail,
      voto: this.newReview.voto,
      commento: this.newReview.commento
    };

    this.http.post(`https://localhost:7155/api/Review/${this.place.id}/post`, review)
      .subscribe({
        next: () => {
          alert('Review posted!');
          this.reviews.push({ ...review, creazioneReview: new Date() });
          this.newReview = { userEmail: '', voto: 0, commento: '' };
        },
        error: err => console.error('Errore post review:', err)
      });
      this.router.navigate(['/']);
  }
}
