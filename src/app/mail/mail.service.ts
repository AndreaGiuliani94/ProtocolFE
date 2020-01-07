import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mail } from './mail';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  getProtocols(): Observable<Mail[]> {
    return this.http.get<Mail[]>('/assets/DummyMails.json');
  }
  constructor(private http: HttpClient) { }
}
