import { Component, OnInit, ViewChild } from '@angular/core';
import { MailService } from '../../services/mail.service';
import { Mail } from '../../model/mail';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})

export class MailListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  mails: MatTableDataSource<Mail>;
  columnsToDisplay: string [] = ['protId', 'mittente', 'destinatario', 'oggetto', 'dataInvio', 'dataRicezione', 'tipo', 'allegati'];

  constructor(private mailService: MailService, private breakpointObserver: BreakpointObserver) {
    this.mails = new MatTableDataSource<Mail>([]);
  }
  ngOnInit() {
    this.loadProtocols();
  }
  loadProtocols(): void {
    this.mailService.getProtocols().subscribe(m => {
      this.mails = new MatTableDataSource(m);
      this.mails.sort = this.sort;
      this.mails.paginator = this.paginator;
      console.log(this.mails);
    } );
  }
}
