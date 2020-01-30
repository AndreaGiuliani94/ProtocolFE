import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { Mail } from 'src/app/model/mail';
import { Tipo } from 'src/app/model/tipo.enum';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  insertForm: FormGroup;
  mail: Mail;
  tipi: Tipo[] = [Tipo.Entrata, Tipo.Interna, Tipo.Uscita];

  constructor(private mailService: MailService, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.insertForm = this.fb.group({
      dataInvio: null,
      dataRicezione: null,
      tipo: null,
      mittente: '',
      destinatario: '',
      oggetto: '',
      allegati: ''
    });
  }

  ngOnInit() {
  }
  onSubmit() {
    const newMail: Mail = { ...this.mail, ...this.insertForm.value };
    console.warn('Your protocol has been submitted', newMail);
    newMail.protId = '';
    this.mailService.insertNewMail(newMail).subscribe(m => {
      console.log(newMail);
      this.snackBar.open('La nuova mail è stata inserita correttamente', '', {
        duration: 3000
      });
      this.router.navigate(['/mobile']);
    }
    );
  }
}
