package psi.projekt.hotel.pokoje;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import psi.projekt.hotel.entity.Pokoje;
import psi.projekt.hotel.entity.projection.PokojeDTO;
import psi.projekt.hotel.entity.projection.PokojeDTORead;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PokojeService {
    private final PokojeRepository repository;
    private final PokojeMapper mapper = PokojeMapper.INSTANCE;
    File currentDir = new File(System.getProperty("user.dir"));
    String projectPath = currentDir.getParent();

    public PokojeService(PokojeRepository repository) {
        this.repository = repository;
    }

    List<PokojeDTO> getEmptyRooms() {
        return repository.findByDostepnoscIsTrue().stream()
                .map(mapper::pokojeToPokojeDTO)
                .collect(Collectors.toList());
    }

    List<PokojeDTORead> getAllRooms() {
        return repository.findAll().stream()
                .map(mapper::pokojeToPokojeDTORead)
                .collect(Collectors.toList());
    }

    Optional<PokojeDTO> getRoomDetailsById(Integer id) {
        Optional<Pokoje> pokoj = repository.findById(id);
        return pokoj.map(mapper::pokojeToPokojeDTO);
    }

    void createRoom(final PokojeDTO pokoj) {
        Pokoje pokojToSave = new Pokoje();
        pokojToSave.setDostepnosc(pokoj.isDostepnosc());
        pokojToSave.setDataZwolnienia(pokoj.getDataZwolnienia());
        pokojToSave.setCena(pokoj.getCena());
        pokojToSave.setTypPokoju(pokoj.getTypPokoju());
        pokojToSave.setWyposazenie(pokoj.getWyposazenie());
        pokojToSave.setIleOsob(pokoj.getIleOsob());

        List<String> imageBytesList = new ArrayList<>();
        for (MultipartFile file : pokoj.getZdjecia()) {
            try {
                String fileName = file.getOriginalFilename();
                File dest = new File(projectPath + "../../frontend/public/room_image/" + fileName);
                file.transferTo(dest);
                String imageName = file.getOriginalFilename();
                imageBytesList.add(imageName);
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
        pokojToSave.setZdjecia(imageBytesList);
        repository.save(pokojToSave);
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
