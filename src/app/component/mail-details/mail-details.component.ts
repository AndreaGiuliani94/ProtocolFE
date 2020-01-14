import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Mail } from 'src/app/model/mail';
import { MailService } from 'src/app/services/mail.service';
import { Card } from 'src/app/model/card';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { MatCardSmImage } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.css']
})
export class MailDetailsComponent implements OnInit {
  public card: Card;
  constructor(
    private mailService: MailService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = (+param).toString();
      this.mailService.getDetails(id).subscribe(m => this.card = {
        title: m.oggetto,
        cols: 2,
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
}
