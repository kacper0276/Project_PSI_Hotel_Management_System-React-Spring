package psi.projekt.hotel.pokoje;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import psi.projekt.hotel.entity.Pokoje;
import psi.projekt.hotel.entity.projection.PokojeDTO;

@Mapper
public interface PokojeMapper {
    PokojeMapper INSTANCE = Mappers.getMapper(PokojeMapper.class);

    PokojeDTO pokojeToPokojeDTO(Pokoje pokoj);
}
