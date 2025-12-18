package sandbox.java_crud_postgres.controller;

import sandbox.java_crud_postgres.model.UserEntry;
import sandbox.java_crud_postgres.repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
// CrossOrigin is vital for local development where React is on port 3000 and Spring is on 8080
@CrossOrigin(origins = "*") 
public class EntryController {

    @Autowired
    private EntryRepository repository;

    // Get all entries (used for page load and Refresh button)
    @GetMapping
    public List<UserEntry> getAllEntries() {
        return repository.findAll();
    }

    // Save a new entry (used for Submit button)
    @PostMapping
    public UserEntry createEntry(@RequestBody UserEntry entry) {
        return repository.save(entry);
    }

    // Delete an entry (used for Delete button)
    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {
        repository.deleteById(id);
    }
}