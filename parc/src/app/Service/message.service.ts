import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageInterface } from '../Interface/message-dialog.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private apiUrl = 'https://api/messages';
  constructor(private dataService: DataService) {}

  // Récupérer les messages pour une attractio
  getMessages(): Observable<MessageInterface[]> {
    const data = this.dataService.getData(this.apiUrl);
    return data as Observable<MessageInterface[]>;
  }

  // Poster un nouveau message
  postMessage(message: MessageInterface): Observable<MessageInterface> {
    const data = this.dataService.postData(this.apiUrl, message);
    return data as Observable<MessageInterface>;
  }
}
