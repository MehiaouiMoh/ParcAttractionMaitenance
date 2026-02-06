import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageInterface } from '../Interface/message.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private apiUrl = '/api/messages'; // proxy Nginx vers ton backend

  constructor(private http: HttpClient) {}

  // Récupérer les messages pour une attraction
  getMessages(): Observable<MessageInterface[]> {
    return this.http.get<MessageInterface[]>(this.apiUrl);
  }

  // Poster un nouveau message
  postMessage(message: MessageInterface): Observable<MessageInterface> {
    return this.http.post<MessageInterface>(this.apiUrl, message);
  }
}
