import { Booking } from './booking'
import { Review } from './reviews';

export interface WorkPlace {
  id?: string;
  nome: string;
  indirizzo: string;
  citta: string; // <-- senza accento
  descrizione?: string;
  ratingMedio: number;
  wifiDisponibile: boolean;
  preseCorrente: boolean;
  ambienteSilenzioso?: boolean;
  orarioApertura?: string;
  orarioChiusura?: string;
  website?: string;
  telefono?: string;
  livelloRumore?: string;
  fasciaPrezzo?: string;
  immagineUrl?: string;

}


