import { Component, OnInit } from '@angular/core';
import { Mail } from 'src/app/model/mail';
import { MailService } from 'src/app/services/mail.service';
import { Card } from 'src/app/model/card';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.css']
})
export class MailDetailsComponent implements OnInit {
  public card: Card;
  constructor(
    private mailService: MailService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mailService.getDetails(id).subscribe(m => this.card = {
        title: m.oggetto,
        cols: 1,
        rows: 1,
        body: m});
    }
  }

  deleteMail(id: string) {
    this.mailService.deleteProtocol(id).subscribe(
      r => {
        this.router.navigate(['/mobile']);
      }
    );
  }

  editMail(mail: Mail) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = mail;
    const dialogRef = this.dialog.open(DialogComponent,
      dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => console.log('Dialog output:', val)
    );
  }
}
