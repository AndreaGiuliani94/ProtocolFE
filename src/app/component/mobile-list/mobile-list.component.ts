import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Mail } from 'src/app/model/mail';
import { MailService } from 'src/app/services/mail.service';
import { Card } from 'src/app/model/card';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { MatCardSmImage, MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Tipo } from 'src/app/model/tipo.enum';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.css']
})
export class MobileListComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  public mails: Mail[];
  public myCards: Card[];
  public mail: Mail;
  public cards;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private mailService: MailService,
    private dataService: DataService,
    private dialog: MatDialog
  ) {
    this.mail = {
      allegati: null,
      dataInvio: null,
      dataRicezione: null,
      destinatario: '',
      mittente: '',
      oggetto: '',
      protId: '',
      tipo: null
    };

    this.dataService.mailsData.subscribe(m => {
      this.mails = m;
      this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
          if (matches) {
            this.myCards = [];
            // tslint:disable-next-line: no-shadowed-variable
            this.mails.forEach(element => {
              const c: Card = {
                title: element.protId,
                cols: 4,
                rows: 2,
                body: element
              };
              this.myCards.push(c);
            });
            return this.myCards;
          } else {
            this.myCards = [];
            // tslint:disable-next-line: no-shadowed-variable
            this.mails.forEach(element => {
              const c: Card = {
                title: element.protId,
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
    } );
  }
  ngOnInit(): void {
  }

  // loadCards(): void {

  // }

  // deleteCard(id) {
  //   for (let i = this.myCards.length - 1; i >= 0; i--) {
  //     if (this.myCards[i].body.protId === id) {
  //       this.myCards.splice(i, 1);
  //     }
  //   }
  //   return this.myCards;
  // }

  deleteMail(id: string) {
    //  this.deleteCard(id);
    this.mailService.deleteProtocol(id).subscribe(r => this.dataService.updateMails());
  }

  editMail(mail: Mail) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = mail;
    const dialogRef = this.dialog.open(DialogComponent,
      dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => {
        console.log('Dialog output:', val);
        this.dataService.updateMails();
      }
    );
  }
}
