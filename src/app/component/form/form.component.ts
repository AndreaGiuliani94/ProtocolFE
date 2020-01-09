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

  constructor(private mailService: MailService, private fb: FormBuilder) {
    this.insertForm = this.fb.group({
      dataInvio: '',
      dataRicezione: '',
      tipo: Tipo.Entrata,
      mittente: '',
      destinatario: '',
      oggetto: '',
      allegati: ''
    });
  }

  ngOnInit() {
  }
  onSubmit(newMail: Mail) {
    console.warn('Your protocol has been submitted', newMail);
    this.mailService.insertNewMail(newMail).subscribe(m => {
      console.log(m); }
    );
  }

}
