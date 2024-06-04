package psi.projekt.hotel.rezerwacje;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import psi.projekt.hotel.entity.Rezerwacje;
import psi.projekt.hotel.entity.projection.RezerwacjeDTO;

@Mapper
public interface RezerwacjeMapper {
    RezerwacjeMapper INSTANCE = Mappers.getMapper(RezerwacjeMapper.class);

    @Mapping(source = "pokoj.id", target = "pokoje_id")
    @Mapping(source = "klient.id", target = "klient_id")
    @Mapping(source = "platnosc.id", target = "platnosc_id")
    RezerwacjeDTO rezerwacjeToRezerwacjeDTO(Rezerwacje rezerwacje);

    @Mapping(target = "pokoj.id", ignore = true)
    @Mapping(target = "klient.id", ignore = true)
    @Mapping(target = "platnosc.id", ignore = true)
    Rezerwacje rezerwacjeDTOToRezerwacje(RezerwacjeDTO rezerwacjeDTO);
}
