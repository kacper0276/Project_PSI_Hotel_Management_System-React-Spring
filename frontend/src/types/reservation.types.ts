interface BaseReservation {
  id?: number;
  cena: number;
  dataZameldowania: string | null;
  dataWymeldowania: string | null;
  nazwiskoKlienta: string | null;
  nrTelKontaktowy: string | null;
  status: string;
}

export interface Reservation extends BaseReservation {
  dataRezerwacji: string | null;
  pokoje_id: number;
  platnosc_id: number;
  zameldowanie: boolean;
  formaZaplaty?: string;
}

export interface ReservationWithFormaZaplaty extends BaseReservation {
  formaZaplaty: string;
}

export interface ReservationData extends BaseReservation {
  pokoje_id: number | null;
}
