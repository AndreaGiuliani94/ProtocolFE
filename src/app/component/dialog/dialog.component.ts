import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { Mail } from 'src/app/model/mail';
import { Tipo } from 'src/app/model/tipo.enum';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  mail: Mail;
  insertForm: FormGroup;
  durationInSeconds = 3;
  tipi: Tipo[] = [Tipo.Entrata, Tipo.Interna, Tipo.Uscita];

  constructor(
    private mailService: MailService,
    private snackBar: MatSnackBar,
    private updateSnackbar: MatSnackBar,
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

  ngOnInit() { }

  onSubmit() {
    const newMail: Mail = { ...this.mail, ...this.insertForm.value };
    if (newMail.protId === '') {
      try {
        this.mailService.insertNewMail(newMail).subscribe(m => {
          console.log(m);
          this.openSnackBar();
          this.dialogRef.close();
        });
      } catch (error) {
        window.alert('La nuova mail non è stata inserita correttamente, controllare i valori inseriti!');
      }

    } else {
      try {
      this.mailService.updateProtocol(newMail).subscribe(m => {
        console.log(m);
        this.updateSnackbar.open('La tua mail è stata modificata correttamente', '', {
          duration: 3000
        } );
        this.dialogRef.close();
      });
    } catch (error) {
      window.alert('Le tue modifiche non sono valide, controllare i valori inseriti!');
      }
    }
  }
  close() {
    this.dialogRef.close();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
@Component({
  selector: 'app-snack-bar',
  templateUrl: 'snack-bar-component.html',
  styles: [`
    .insert-mail {
      color: darkred;
      font-size: 18px;
    }
  `],
})
export class SnackBarComponent { }
