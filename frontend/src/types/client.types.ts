export interface ClientData {
  imie: string | null;
  nazwisko: string | null;
  nip: string | null;
  nazwaFirmy: string | null;
  rodzaj: string;
  uzytkownik: {
    email: string;
  };
}
