export interface User {
  id: number;
  email: string;
  haslo: string;
  rola: string;
}

export interface UserDetails extends User {}

export interface UserState {
  id: number;
  email: string;
  password: string;
  second_password: string;
  rola: string;
  firstPassword: string;
}
