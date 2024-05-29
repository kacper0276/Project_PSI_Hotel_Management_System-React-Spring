package psi.projekt.hotel.pokoje;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Pokoje;
import psi.projekt.hotel.entity.projection.PokojeDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PokojeService {
    private final PokojeRepository repository;
    private final PokojeMapper mapper = PokojeMapper.INSTANCE;

    public PokojeService(PokojeRepository repository) {
        this.repository = repository;
    }

    List<PokojeDTO> getEmptyRooms() {
        return repository.findByDostepnoscIsTrue().stream()
                .map(mapper::pokojeToPokojeDTO)
                .collect(Collectors.toList());
    }

    List<PokojeDTO> getAllRooms() {
        return repository.findAll().stream()
                .map(mapper::pokojeToPokojeDTO)
                .collect(Collectors.toList());
    }

    Optional<PokojeDTO> getRoomDetailsById(Integer id) {
        Optional<Pokoje> pokoj = repository.findById(id);
        return pokoj.map(mapper::pokojeToPokojeDTO);
    }

    void createRoom(final Pokoje pokoj) {
        repository.save(pokoj);
    }

    void changeRoomAvailability(Integer roomId) {
        Pokoje room = repository.findById(roomId).orElse(null);

        if (room != null) {
            room.setDostepnosc(!room.isDostepnosc());

            repository.save(room);
            return;
        }
    }

    void changeRoomData(Pokoje pokoj) {
        repository.save(pokoj);

        return;
    }

    void deleteRoom(Integer id) {
        repository.findById(id).ifPresent(repository::delete);

    }
}
