package psi.projekt.hotel.klienci;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.projection.KlienciPrywatniReadModel;

@Mapper
public interface KlienciMapper {

    KlienciMapper INSTANCE = Mappers.getMapper(KlienciMapper.class);

    KlienciPrywatniReadModel klienciToKlienciPrywatniRead(Klienci klient);

    Klienci klienciPrywatniReadModelToKlienci(KlienciPrywatniReadModel klient);
}
