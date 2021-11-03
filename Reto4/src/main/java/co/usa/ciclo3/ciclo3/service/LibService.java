package co.usa.ciclo3.ciclo3.service;

/**
 *
 * @author Elsy Del Águila
 */
import co.usa.ciclo3.ciclo3.model.Lib;
import co.usa.ciclo3.ciclo3.repository.LibRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibService {

    @Autowired
    private LibRepository libRepository;

    public List<Lib> getAll() {
        return libRepository.getAll();
    }

    public Optional<Lib> getLib(int idlib) {
        return libRepository.getLib(idlib);
    }

    public Lib save(Lib lib) {
        if (lib.getId() == null) {
            return libRepository.save(lib);
        } else {
            Optional<Lib> paux = libRepository.getLib(lib.getId());
            if (paux.isEmpty()) {
                return libRepository.save(lib);
            } else {
                return lib;
            }
        }
    }

    public Lib update(Lib lib) {
        if (lib.getId() != null) {
            Optional<Lib> lbrary = libRepository.getLib(lib.getId());
            if (!lbrary.isEmpty()) {
                if (lib.getName() != null) {
                    lbrary.get().setName(lib.getName());
                }
                if (lib.getTarget() != null) {
                    lbrary.get().setTarget(lib.getTarget());
                }
                if (lib.getCategory() != null) {
                    lbrary.get().setCategory(lib.getCategory());
                }
                if (lib.getDescription() != null) {
                    lbrary.get().setDescription(lib.getDescription());
                }
                if (lib.getCategory() != null) {
                    lbrary.get().setCategory(lib.getCategory());
                }
                libRepository.save(lbrary.get());
                return lbrary.get();
            } else {
                return lib;
            }
        } else {
            return lib;
        }
    }

    public boolean deleteLib(int idlib) {
        Boolean lBoolean = getLib(idlib).map(lib -> {
            libRepository.delete(lib);
            return true;
        }).orElse(false);
        return lBoolean;
    }
}
