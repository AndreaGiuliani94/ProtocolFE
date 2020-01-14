import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Mail } from 'src/app/model/mail';
import { MailService } from 'src/app/services/mail.service';
import { Card } from 'src/app/model/card';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { MatCardSmImage } from '@angular/material';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.css']
})
export class MobileListComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  public mails: Mail[];

  public cards;
  public myCards = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private mailService: MailService
  ) {  }
  ngOnInit(): void {
    this.loadProtocols();
  }

  loadProtocols(): void {
    this.mailService.getProtocols().subscribe(m => {
      this.mails = m;
      this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
          if (matches) {
            // tslint:disable-next-line: no-shadowed-variable
            this.mails.forEach(element => {
              const c: Card = {
                title: element.oggetto,
                cols: 2,
                rows: 1,
                body: element
              };
              this.myCards.push(c);
            });
            return this.myCards;
          } else {
            // tslint:disable-next-line: no-shadowed-variable
            this.mails.forEach(element => {
              const c: Card = {
                title: element.oggetto,
                cols: 1,
                rows: 2,
                body: element
              };
              this.myCards.push(c);
            });
            return this.myCards;
          }
        })
      );
    });
  }

  deleteCard(id) {
    for (let i = this.myCards.length - 1; i >= 0; i--) {
      if (this.myCards[i].body.protId === id) {
        this.myCards.splice(i, 1);
      }
    }
    return this.myCards;
  }

  deleteMail(id: string) {
    this.deleteCard(id);
    this.mailService.deleteProtocol(id).subscribe();
  }
}
