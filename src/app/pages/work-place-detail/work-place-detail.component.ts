import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkPlace } from '../../models/work-place';
import { WorkPlacesService } from '../../services/workplaces.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Booking } from '../../models/booking';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-workplace-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
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
    private http: HttpClient,
  private translate: TranslateService 
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
  if (!this.place) return;

  this.translate.get([
    'WORKPLACE.CONFIRM_DELETE_TITLE',
    'WORKPLACE.CONFIRM_DELETE_TEXT',
    'WORKPLACE.CONFIRM_DELETE_CONFIRM',
    'WORKPLACE.CONFIRM_DELETE_CANCEL',
    'WORKPLACE.DELETE_SUCCESS',
    'WORKPLACE.DELETE_ERROR'
  ]).subscribe(t => {
    Swal.fire({
      icon: 'warning',
      title: t['WORKPLACE.CONFIRM_DELETE_TITLE'],
      text: t['WORKPLACE.CONFIRM_DELETE_TEXT'],
      showCancelButton: true,
      confirmButtonText: t['WORKPLACE.CONFIRM_DELETE_CONFIRM'],
      cancelButtonText: t['WORKPLACE.CONFIRM_DELETE_CANCEL'],
      confirmButtonColor: '#dc3545'
    }).then(result => {
      if (result.isConfirmed && this.place?.id) {
        this.service.delete(this.place.id).subscribe({
          next: () => {
            Swal.fire('✅', t['WORKPLACE.DELETE_SUCCESS'], 'success');
            this.router.navigate(['/explore']);
          },
          error: () => {
            Swal.fire('❌', t['WORKPLACE.DELETE_ERROR'], 'error');
          }
        });
      }
    });
  });
}


bookNow() {
  if (!this.place?.id) return;

  this.service.bookPlace(this.place.id, this.bookingData).subscribe({
    next: () => {
      this.translate.get(['WORKPLACE.BOOK_SUCCESS']).subscribe(t => {
        Swal.fire('✅', t['WORKPLACE.BOOK_SUCCESS'], 'success');
        this.router.navigate(['/']);
      });
    },
    error: err => {
      this.translate.get(['WORKPLACE.BOOK_ERROR']).subscribe(t => {
        Swal.fire('❌', t['WORKPLACE.BOOK_ERROR'], 'error');
      });
      console.error('Booking failed:', err);
    }
  });
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
  if (!this.place?.id) return;

  const review = { ...this.newReview };

  this.http.post(`https://localhost:7155/api/Review/${this.place.id}/post`, review)
  .subscribe({
    next: () => {
      this.translate.get(['WORKPLACE.REVIEW_SUCCESS']).subscribe(t => {
        Swal.fire('✅', t['WORKPLACE.REVIEW_SUCCESS'], 'success');
      });
      this.reviews.push({ ...review, creazioneReview: new Date() });
      this.newReview = { userEmail: '', voto: 0, commento: '' };
      this.router.navigate(['/']);
    },
    error: err => {
      this.translate.get(['WORKPLACE.REVIEW_ERROR']).subscribe(t => {
        Swal.fire('❌', t['WORKPLACE.REVIEW_ERROR'], 'error');
      });
      console.error('Errore post review:', err);
    }
  });

}

}
