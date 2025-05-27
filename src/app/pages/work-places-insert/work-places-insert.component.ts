import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { WorkPlacesService } from '../../services/workplaces.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-workplace',
  templateUrl: './work-places-insert.component.html',
  styleUrls: ['./work-places-insert.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule, TranslateModule],
})
export class WorkPlacesInsertComponent {
  workplaceForm: FormGroup; // ✅ NOME CAMBIATO!

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private workplacesService: WorkPlacesService, private translate: TranslateService) {
    this.workplaceForm = this.fb.group({
      nome: ['', Validators.required],
      indirizzo: ['', Validators.required],
      descrizione: [''],
      tipo: [''],
      wifiDisponibile: [false],
      preseCorrente: [false],
      citta: [''],
      immagineUrl: [''],
      ratingMedio: [0],
      orarioApertura: [''],
      orarioChiusura: [''],
      website: [''],
      telefono: [''],
      ambienteSilenzioso: [false],
      livelloRumore: [''],
      fasciaPrezzo: ['']
    });
  }

onSubmit() {
  if (this.workplaceForm.valid) {
    const data = this.workplaceForm.value;

    this.workplacesService.insertWork(data).subscribe({
      next: () => {
        this.translate.get(['WORKPLACE.ADD_SUCCESS']).subscribe(t => {
          Swal.fire({
            icon: 'success',
            title: t['WORKPLACE.ADD_SUCCESS'],
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/explore']);
          });
        });
      },
      error: (err) => {
        console.error('Error while adding workspace:', err);
        this.translate.get(['WORKPLACE.ADD_ERROR']).subscribe(t => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: t['WORKPLACE.ADD_ERROR']
          });
        });
        this.router.navigate(['/login']);
      }
    });
  }
}



}
