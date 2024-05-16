package psi.projekt.hotel.klienci;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.projection.KlienciBiznesowi;
import psi.projekt.hotel.entity.projection.KlienciPrywatni;

@Mapper
public interface KlienciMapper {

    KlienciMapper INSTANCE = Mappers.getMapper(KlienciMapper.class);

    KlienciPrywatni klienciToKlienciPrywatni(Klienci klienci);

    Klienci klienciPrywatniToKlienci(KlienciPrywatni klienci);

    KlienciBiznesowi klienciToKlienciBiznesowi(Klienci klienci);

    Klienci klienciBiznesowiToKlienci(KlienciBiznesowi klienci);
}
