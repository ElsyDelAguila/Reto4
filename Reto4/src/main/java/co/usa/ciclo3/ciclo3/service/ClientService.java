package co.usa.ciclo3.ciclo3.service;

import co.usa.ciclo3.ciclo3.model.Client;
import co.usa.ciclo3.ciclo3.repository.ClientRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Elsy Del Águila
 */
@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll() {
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int clientId) {
        return clientRepository.getClient(clientId);
    }

    public Client save(Client client) {
        if (client.getIdClient() == null) {
            return clientRepository.save(client);
        } else {
            Optional<Client> paux = clientRepository.getClient(client.getIdClient());
            if (paux.isEmpty()) {
                return clientRepository.save(client);
            } else {
                return client;
            }
        }
    }

    public Client update(Client client) {
        if (client.getIdClient() != null) {
            Optional<Client> cli = clientRepository.getClient(client.getIdClient());
            if (!cli.isEmpty()) {
                if (client.getName() != null) {
                    cli.get().setName(client.getName());
                }
                if (client.getAge() != null) {
                    cli.get().setAge(client.getAge());
                }
                if(client.getEmail()!= null){
                    cli.get().setEmail(client.getEmail());
                }
                if (client.getPassword() != null) {
                    cli.get().setPassword(client.getPassword());
                }
                clientRepository.save(cli.get());
                return cli.get();
            } else {
                return client;
            }
        } else {
            return client;
        }
    }

    public boolean deleteClient(int clientId) {
        Boolean aBoolean = getClient(clientId).map(client -> {
            clientRepository.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
