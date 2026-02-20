import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { AttractionService } from '../Service/attraction.service';
import { AttractionInterface } from '../Interface/attraction.interface';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MessageDialogComponent } from '../messages/message-dialog.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent {

  // Observable utilisé dans le HTML avec | async
  public attractions: Observable<AttractionInterface[]>;

  constructor(
    public attractionService: AttractionService,
    private dialog: MatDialog
  ) {
    // chargement des attractions
    this.attractions = this.attractionService.getAllAttraction();
  }

  // Ouvre la popup "Ajouter un avis"
  openMessageDialog(attraction: AttractionInterface): void {
    console.log('Ouverture popup pour', attraction.nom); // 🔹 test
    this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: {
        attractionNom: attraction.nom
      }
    });
  }
}