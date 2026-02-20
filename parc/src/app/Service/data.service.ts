import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }

  public getData<T>(url: string): Observable<T> {
    return this.http.get<T>(url) as Observable<T>;
  }

  public getDataWithOptions<T>(url: string, options?: any): Observable<T> {
    return this.http.get<T>(url, options) as Observable<T>;
  }

  public postData(url: string, data: any) {
    let result = this.http.post(url, data);
    return result;
  }

  public deleteData(url: string) {
    let result = this.http.delete(url);
    return result;
  }
}