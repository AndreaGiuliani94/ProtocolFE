import { Mail } from './mail';

export interface Card {
  body: Mail;
  title: string;
  rows: number;
  cols: number;
}
