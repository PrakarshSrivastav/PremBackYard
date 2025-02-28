package com.prem.prem_backyard.Player;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping(path="/Premplayer")
public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService){
        this.playerService=playerService;
    }


    @GetMapping
    public List<Player> getPlayer(
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String nation,
            Principal principal){
        if(team != null && position != null){
            return playerService.getPlayerByTeamAndPosition(team, position);
        }else if(team != null){
            return playerService.getPlayerFromTeam(team);
        }else if(name != null){
            return playerService.getPlayerByName(name);
        }else if(position != null){
            return playerService.getPlayersByPos((position));
        }
        else if(nation != null){
            return playerService.getPlayerByNation(nation);
        }
        else{
            return playerService.getPlayers();
        }
    }

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player){
        Player addPlayer=playerService.addPlayer(player);
        return new ResponseEntity<>(addPlayer, HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player){
        Player resultPlayer = playerService.updatePlayer(player);
        if ( resultPlayer != null){
            return new ResponseEntity<>(resultPlayer, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{playerName}")
    public ResponseEntity<String> deletePlayer(@PathVariable String playerName){
        playerService.deletePlayer(playerName);
        return new ResponseEntity<>("Player Deleted Succesfully", HttpStatus.OK);
    }
    @GetMapping("/nations")
    public List<String> getDistinctNations() {
        return playerService.getDistinctNations();
    }
    @GetMapping("/filtered")
    public List<Player> getFilteredPlayers(
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String nation) {
        return playerService.getPlayersByFilters(team, position, nation);
    }
}
