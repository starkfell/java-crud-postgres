package sandbox.java_crud_postgres;

import sandbox.java_crud_postgres.model.UserEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends JpaRepository<UserEntry, Long> {
    // Standard CRUD methods are automatically provided by JpaRepository
}