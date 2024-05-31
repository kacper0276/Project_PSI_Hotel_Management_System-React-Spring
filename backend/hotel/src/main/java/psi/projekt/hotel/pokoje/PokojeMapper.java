package psi.projekt.hotel.pokoje;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.web.multipart.MultipartFile;
import psi.projekt.hotel.entity.Pokoje;
import psi.projekt.hotel.entity.projection.PokojeDTO;
import psi.projekt.hotel.entity.projection.PokojeDTORead;

import java.util.List;

@Mapper
public interface PokojeMapper {
    PokojeMapper INSTANCE = Mappers.getMapper(PokojeMapper.class);

    PokojeDTO pokojeToPokojeDTO(Pokoje pokoj);

    PokojeDTORead pokojeToPokojeDTORead(Pokoje pokoj);

    default PokojeDTO pokojeToPokojeDTOMapping(Pokoje pokoj) {
        PokojeDTO dto = pokojeToPokojeDTO(pokoj);
        dto.setZdjecia(mapZdjecia(pokoj.getZdjecia()));
        return dto;
    }

    default MultipartFile[] mapZdjecia(List<String> zdjecia) {
        return new MultipartFile[0];
    }
}
