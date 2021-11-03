package co.usa.ciclo3.ciclo3.web;

/**
 *
 * @author Elsy Del Águila
 */
import co.usa.ciclo3.ciclo3.model.Lib;
import co.usa.ciclo3.ciclo3.service.LibService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Lib")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

public class LibController {

    @Autowired
    private LibService libService;

    @GetMapping("/all")
    public List<Lib> getLib() {
        return libService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Lib> getLib(@PathVariable("id") int libId) {
        return libService.getLib(libId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Lib save(@RequestBody Lib lib) {
        return libService.save(lib);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Lib update(@RequestBody Lib lib) {
        return libService.update(lib);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int libId) {
        return libService.deleteLib(libId);
    }
}
