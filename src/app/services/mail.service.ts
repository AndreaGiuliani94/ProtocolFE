import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mail } from '../model/mail';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private url = 'https://localhost:44306/api/MailsAPI';
  private counter = 4;
  insertNewMail(newMail: Mail): Observable <Mail>  {
    const mail = {protId:'',
    dataInvio: '',
    dataRicezione: 'string',
    tipo: 0,
    mittente: 'string',
    destinatario: 'string',
    oggetto: 'string',
    allegati: 0}
    const header = new HttpHeaders({'Content-Type' : 'application/json'});
    newMail.protId = '';
    return this.http.post<Mail>(this.url, mail , {headers: header} );
  }
  findMails(protId: number, filter: string, sortOrder: string, pageNumber: number, pageSize: number) {
        return this.http.get(this.url, {
          params: new HttpParams()
              .set('protId', protId.toString())
              .set('filter', filter)
              .set('sortOrder', sortOrder)
              .set('pageNumber', pageNumber.toString())
              .set('pageSize', pageSize.toString())
      });
  }
  getProtocols(): Observable<Mail[]> {
    return this.http.get<Mail[]>(this.url);
  }
  constructor(private http: HttpClient) { }
}
