package psi.projekt.hotel.rezerwacje;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RezerwacjeMapper {
    RezerwacjeMapper INSTANCE = Mappers.getMapper(RezerwacjeMapper.class);
}
