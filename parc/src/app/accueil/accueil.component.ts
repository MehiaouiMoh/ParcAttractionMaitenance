import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';

import { MessageService } from '../Service/message.service';
import { MessageInterface } from '../Interface/message-dialog.interface';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  public attractions: Observable<AttractionInterface[]>;
  public messages$: Observable<MessageInterface[]>;  

  constructor(
    public attractionService: AttractionService,
    private messageService: MessageService
  ) {
    this.attractions = this.attractionService.getAllAttraction();
    this.messages$ = this.messageService.getMessages();
  }

}
