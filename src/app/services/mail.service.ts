import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mail } from '../model/mail';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  findMails(protId: number, filter: string, sortOrder: string, pageNumber: number, pageSize: number) {
        return this.http.get('/assets/DummyMails.json', {
          params: new HttpParams()
              .set('protId', protId.toString())
              .set('filter', filter)
              .set('sortOrder', sortOrder)
              .set('pageNumber', pageNumber.toString())
              .set('pageSize', pageSize.toString())
      });
  }

  getProtocols(): Observable<Mail[]> {
    return this.http.get<Mail[]>('/assets/DummyMails.json');
  }
  constructor(private http: HttpClient) { }
}
