package sandbox.java_crud_postgres.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sandbox.java_crud_postgres.model.UserEntry;
import sandbox.java_crud_postgres.repository.EntryRepository;

@RestController
@RequestMapping("/api/entries")
@CrossOrigin(origins = "*")
public class EntryController {

    @Autowired
    private EntryRepository repository;

    @GetMapping
    public List<UserEntry> getAllEntries() {
        return repository.findAll();
    }

    @PostMapping
    public UserEntry createEntry(@RequestBody UserEntry entry) {
        return repository.save(entry);
    }

    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
