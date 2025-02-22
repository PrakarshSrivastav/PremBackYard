package com.prem.prem_backyard.Player;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepo extends JpaRepository<Player, String>{
    void deleteByName(String name);
    Optional<Player> findByName(String name);
}
