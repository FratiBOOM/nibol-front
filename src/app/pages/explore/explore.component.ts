import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkPlace } from '../../models/work-place';
import { WorkPlacesService } from '../../services/workplaces.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-workspaces',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgFor],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreWorkspacesComponent implements OnInit {
  workspaces: WorkPlace[] = [];
  selectedCity: string = '';


  constructor(private workPlaceService: WorkPlacesService, private router: Router) {}

  get filteredWorkspaces(): WorkPlace[] {
  if (!this.selectedCity) {
    return this.workspaces;
  }
  return this.workspaces.filter(w => w.citta?.toLowerCase() === this.selectedCity.toLowerCase());
}


get uniqueCities(): string[] {
  return this.workspaces
    .map(w => w.citta)
    .filter((city, index, arr) => city && arr.indexOf(city) === index);
}



  ngOnInit(): void {
    this.workPlaceService.getAll().subscribe({
      next: data => this.workspaces = data,
      error: err => console.error('Errore nel caricamento:', err)
    });
  }
}
