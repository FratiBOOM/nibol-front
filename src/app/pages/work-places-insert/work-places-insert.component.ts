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


@Component({
  selector: 'app-add-workplace',
  templateUrl: './work-places-insert.component.html',
  styleUrls: ['./work-places-insert.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule, TranslateModule],
})
export class WorkPlacesInsertComponent {
  workplaceForm: FormGroup; // ✅ NOME CAMBIATO!

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private workplacesService: WorkPlacesService) {
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
        next: (response) => {
          this.router.navigate(['/explore']);
          alert('Workspace successfully added!');
        },
        error: (err) => {
          console.error('Error while adding workspace:', err);
          alert('An error occurred while adding the workspace.');
          this.router.navigate(['/login']);
        }
      });
    }
  }


}
