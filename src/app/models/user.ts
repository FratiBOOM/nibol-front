export interface User {
  id?: string;
  nome: string;
  cognome: string;
  email: string;
  passwordHash?: string;
}
