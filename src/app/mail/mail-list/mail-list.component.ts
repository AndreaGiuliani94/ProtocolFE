import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import { Mail } from '../mail';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit {

  constructor(private mailService: MailService) { }
  mails: Mail[];
  ngOnInit() {
    this.loadProtocols();
  }
  loadProtocols(): void {
    this.mailService.getProtocols().subscribe(m => this.mails = m);
  }
}
