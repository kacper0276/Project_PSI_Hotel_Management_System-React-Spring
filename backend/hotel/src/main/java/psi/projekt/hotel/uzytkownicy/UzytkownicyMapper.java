package psi.projekt.hotel.uzytkownicy;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import psi.projekt.hotel.entity.projection.UzytkownicyDTO;

@Mapper
public interface UzytkownicyMapper {
    UzytkownicyMapper INSTANCE = Mappers.getMapper(UzytkownicyMapper.class);

    @Mapping(target = "email", source = "uzytkownik.email")
    @Mapping(target = "haslo", source = "uzytkownik.haslo")
    UzytkownicyDTO uzytkownicyToUzytkownicyDTO(Uzytkownicy uzytkownik);
}
