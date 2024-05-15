INSERT INTO platnosci(data_platnosci, kwota, metoda_platnosci, status_platnosci) VALUES ("2024-05-15", 100, "Karta", "Zaplacone");

INSERT INTO klienci(email, haslo, imie, nazwa_firmy, nazwisko, nip, rodzaj, rola) VALUES("Test@test.pl", "haslo", "Adam", NULL, "Adamski", NULL, "KlientIndywidualny", "Klient");

INSERT INTO pokoje(cena, data_zwolnienia, dostepnosc, ile_osob, typ_pokoju, wyposazenie) VALUES(250, "2024-05-15", 0, 4, "Fajny", "Dobre");
INSERT INTO pokoje(cena, data_zwolnienia, dostepnosc, ile_osob, typ_pokoju, wyposazenie) VALUES(250, NULL, 1, 2, "Inny ale tez dobry", "Wspaniale");