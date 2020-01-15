import { Component, OnInit, Pipe, PipeTransform, Inject, NgModule, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { Mail } from 'src/app/model/mail';
import { Tipo } from 'src/app/model/tipo.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  mail: Mail;
  insertForm: FormGroup;

  tipi: Tipo[] = [Tipo.Entrata, Tipo.Interna, Tipo.Uscita];

  constructor(
    private mailService: MailService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) injMail: Mail) {
    this.mail = injMail;
    this.insertForm = this.fb.group({
      oggetto: injMail.oggetto,
      allegati: injMail.allegati,
      dataInvio: injMail.dataInvio,
      dataRicezione: injMail.dataRicezione,
      mittente: injMail.mittente,
      destinatario: injMail.destinatario,
      tipo: injMail.tipo
    });
  }

  ngOnInit() {

  }
  onSubmit() {
    const newMail: Mail = { ...this.mail, ...this.insertForm.value };
    if (newMail.protId === '') {
      this.mailService.insertNewMail(newMail).subscribe(m => {
        console.log(m);
        this.dialogRef.close();
      });
    } else {
      this.mailService.updateProtocol(newMail).subscribe(m => {
        console.log(m);
        this.dialogRef.close();
      });
    }
  }
  close() {
    this.dialogRef.close();
  }

}
