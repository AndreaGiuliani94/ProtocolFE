import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Card } from '../model/card';
import { Mail } from '../model/mail';
import { MailService } from './mail.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  mailsData: BehaviorSubject<Mail[]>;

  constructor(private mailService: MailService) {
    this.mailsData = new BehaviorSubject<Mail[]>([]);
    this.initData();
  }
  public initData() {
    this.updateMails();
  }
  updateMails() {
    this.mailService.getProtocols().subscribe( m => {
      this.mailsData.next(m);
      }
    );
  }

}
