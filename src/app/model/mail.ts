import { Tipo } from './tipo.enum';

export interface Mail {
  protId: string;
  dataInvio: string;
  dataRicezione: string;
  tipo: number;
  mittente: string;
  destinatario: string;
  oggetto: string;
  allegati: number;
}
