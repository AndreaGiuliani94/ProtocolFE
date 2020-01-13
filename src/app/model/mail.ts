import { Tipo } from './tipo.enum';

export interface Mail {
  protId: string;
  dataInvio: Date;
  dataRicezione: Date;
  tipo: Tipo;
  mittente: string;
  destinatario: string;
  oggetto: string;
  allegati: number;
}
