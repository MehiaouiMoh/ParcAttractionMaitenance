import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MessageInterface } from '../Interface/message.interface';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {

  constructor(private dataService: DataService, private authService: AuthService) {

  }

  public getAllAttraction() : Observable<AttractionInterface[]> {
    const url = "https://api/attraction";
    return this.dataService.getData<AttractionInterface[]>(url);
  }

  public getAllAttractionsAdmin() : Observable<AttractionInterface[]> {
    const url = "https://api/attractionAdmin";
    const token = this.authService.user ? this.authService.user.token : '';
    const options = { headers: new HttpHeaders({ Authorization: `Token ${token}` }) };
    return this.dataService.getDataWithOptions<AttractionInterface[]>(url, options);
  }

  public postAttraction(attraction: AttractionInterface): Observable<MessageInterface> {
    const url = "https://api/attraction";
    const data = this.dataService.postData(url, attraction);
    return data as Observable<MessageInterface>;
  }
}