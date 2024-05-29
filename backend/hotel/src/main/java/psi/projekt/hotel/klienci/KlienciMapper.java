package psi.projekt.hotel.klienci;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.projection.KlienciBiznesowi;
import psi.projekt.hotel.entity.projection.KlienciBiznesowiDTO;
import psi.projekt.hotel.entity.projection.KlienciPrywatni;
import psi.projekt.hotel.entity.projection.KlienciPrywatniDTO;

@Mapper
public interface KlienciMapper {

    KlienciMapper INSTANCE = Mappers.getMapper(KlienciMapper.class);

    KlienciPrywatni klienciToKlienciPrywatni(Klienci klienci);

    Klienci klienciPrywatniToKlienci(KlienciPrywatni klienci);

    KlienciBiznesowi klienciToKlienciBiznesowi(Klienci klienci);

    Klienci klienciBiznesowiToKlienci(KlienciBiznesowi klientBiznesowy);

    @Mapping(target = "email", source = "uzytkownik.email")
    @Mapping(target = "haslo", source = "uzytkownik.haslo")
    @Mapping(target = "nip", source = "nip")
    @Mapping(target = "nazwaFirmy", source = "nazwaFirmy")
    KlienciBiznesowiDTO klienciToKlienciBiznesowiDTO(Klienci klienci);

    @Mapping(target = "email", source = "uzytkownik.email")
    @Mapping(target = "haslo", source = "uzytkownik.haslo")
    @Mapping(target = "imie", source = "imie")
    @Mapping(target = "nazwisko", source = "nazwisko")
    KlienciPrywatniDTO klienciToKlienciPrywatniDTO(Klienci klienci);
}
