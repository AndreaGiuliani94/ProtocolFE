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
  private counter = 42;

  constructor(private http: HttpClient) { }

  insertNewMail(newMail: Mail): Observable <Mail>  {
    const header = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post<Mail>(this.url, newMail , {headers: header} );
  }

  getProtocols(): Observable<Mail[]> {
    return this.http.get<Mail[]>(this.url);
  }

  deleteProtocol(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getDetails(id: string): Observable<Mail> {
    return this.http.get<Mail>(`${this.url}/${id}`);
  }

  updateProtocol(editedMail: Mail): Observable<Mail> {
    const header = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.put<Mail>(`${this.url}/${editedMail.protId}`, editedMail, {headers: header} );
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

}
