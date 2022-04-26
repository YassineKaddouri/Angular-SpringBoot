package com.IURC.IURC.Repositories;

import com.IURC.IURC.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    Optional<User> findAllByUsername(String username);


}
