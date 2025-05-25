import { Booking } from './booking'
import { Review } from './reviews';

export interface WorkPlace {
  id?: string;
  nome: string;
  indirizzo: string;
  tipo: string;
  descrizione: string;
  wifiDisponibile: boolean;
  preseCorrente: boolean;
  città: string;
  immagineUrl?: string;
  ratingMedio: number;
  bookings: Booking[];
  reviews: Review[];
}
