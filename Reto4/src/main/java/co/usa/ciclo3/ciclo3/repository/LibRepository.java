package co.usa.ciclo3.ciclo3.repository;

/**
 *
 * @author Elsy Del Águila
 */
import co.usa.ciclo3.ciclo3.model.Lib;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import co.usa.ciclo3.ciclo3.repository.crud.LibCrudRepository;

@Repository
public class LibRepository {

    @Autowired
    private LibCrudRepository libCrudRepository;

    public List<Lib> getAll() {
        return (List<Lib>) libCrudRepository.findAll();
    }

    public Optional<Lib> getLib(int id) {
        return libCrudRepository.findById(id);
    }

    public Lib save(Lib lib) {
        return libCrudRepository.save(lib);
    }

    public void delete(Lib lib) {
        libCrudRepository.delete(lib);
    }
}
