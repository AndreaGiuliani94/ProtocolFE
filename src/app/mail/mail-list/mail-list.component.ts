import { Component, OnInit, ViewChild } from '@angular/core';
import { MailService } from '../mail.service';
import { Mail } from '../mail';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})

export class MailListComponent implements OnInit {
  sortedData: Mail[];
  mails: Mail[];
  dataSource = new MatTableDataSource<Mail>(this.mails);
  columnsToDisplay = ['id', 'mittente', 'destinatario', 'oggetto', 'dataInvio' , 'dataRicezione', 'tipo', 'allegati'];
  constructor(private mailService: MailService) {
    this.sortedData = this.mails;
  }
  ngOnInit() {
    this.loadProtocols();

  }
  loadProtocols(): void {
    this.mailService.getProtocols().subscribe(m => (this.mails = m));
  }
  sortData(sort: Sort) {
    const data = this.mails.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: Mail, b: Mail) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.protId, b.protId, isAsc);
        case 'tipo':
          return compare(a.tipo, b.tipo, isAsc);
        case 'mittente':
          return compare(a.mittente, b.mittente, isAsc);
        case 'destinatario':
          return compare(a.destinatario, b.destinatario, isAsc);
        case 'oggetto':
          return compare(a.oggetto, b.oggetto, isAsc);
        case 'allegati':
          return compare(a.allegati, b.allegati, isAsc);
        case 'dataInvio':
          return compare(a.dataInvio, b.dataInvio, isAsc);
        case 'dataRicezione':
          return compare(a.dataRicezione, b.dataRicezione, isAsc);

        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
