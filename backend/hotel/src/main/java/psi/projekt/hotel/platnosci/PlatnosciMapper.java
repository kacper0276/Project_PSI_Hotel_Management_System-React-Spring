package psi.projekt.hotel.platnosci;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import psi.projekt.hotel.entity.Platnosci;
import psi.projekt.hotel.entity.Rezerwacje;
import psi.projekt.hotel.entity.projection.PlatnosciDTO;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface PlatnosciMapper {

    PlatnosciMapper INSTANCE = Mappers.getMapper(PlatnosciMapper.class);

    @Mapping(target = "rezerwacje_id", source = "rezerwacje", qualifiedByName = "mapRezerwacjeToIds")
    PlatnosciDTO toDto(Platnosci platnosci);

    @Mapping(target = "rezerwacje", ignore = true)
    Platnosci toEntity(PlatnosciDTO platnosciDTO);

    @Named("mapRezerwacjeToIds")
    static Set<Integer> mapRezerwacjeToIds(Set<Rezerwacje> rezerwacje) {
        return rezerwacje.stream()
                .map(Rezerwacje::getId)
                .collect(Collectors.toSet());
    }
}