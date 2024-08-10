interface BaseRoom {
  dostepnosc: boolean;
  dataZwolnienia: string | null;
  cena: number;
  typPokoju: string;
  ileOsob: number;
  wyposazenie: string;
}

export interface Room extends BaseRoom {
  id: number;
  zdjecia: string[];
}

export interface RoomWithFiles extends BaseRoom {
  zdjecia: FileList | null;
}
