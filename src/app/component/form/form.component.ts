import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { Mail } from 'src/app/model/mail';
import { Tipo } from 'src/app/model/tipo.enum';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  insertForm: FormGroup;
  mail: Mail;
  tipi: Tipo [] = [ Tipo.Entrata, Tipo.Interna, Tipo.Uscita ];

  constructor(private mailService: MailService, private fb: FormBuilder) {
    this.insertForm = this.fb.group({
      dataInvio: '',
      dataRicezione: '',
      tipo: '',
      mittente: '',
      destinatario: '',
      oggetto: '',
      allegati: ''
    });
  }

  ngOnInit() {
  }
  onSubmit() {
    const newMail: Mail = { ...this.mail, ...this.insertForm.value};
    console.warn('Your protocol has been submitted', newMail);
    this.mailService.insertNewMail(newMail).subscribe(m => {
      console.log(newMail); },
      error => console.log(error)
    );
  }
}
