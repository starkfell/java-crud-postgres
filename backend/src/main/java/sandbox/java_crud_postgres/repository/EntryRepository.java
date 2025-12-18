package sandbox.java_crud_postgres.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sandbox.java_crud_postgres.model.UserEntry;

@Repository
public interface EntryRepository extends JpaRepository<UserEntry, Long> {
}
