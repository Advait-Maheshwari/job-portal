package com.excelr.jobportal;

import jakarta.persistence.*;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
public class JobPortalApplication {
  public static void main(String[] args) { SpringApplication.run(JobPortalApplication.class, args); }

  @Bean CommandLineRunner seed(ItemRepo repo) {
    return args -> {
      if (repo.count() == 0) List.of(new Item("Java Developer", "Admin", "Active"), new Item("React Engineer", "Manager", "Review"), new Item("Spring Boot Intern", "Team", "Planned")).forEach(repo::save);
    };
  }
}

@Entity class Item {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
  String name;
  String owner;
  String status;
  protected Item() {}
  Item(String name, String owner, String status) { this.name = name; this.owner = owner; this.status = status; }
  public Long getId() { return id; }
  public String getName() { return name; }
  public String getOwner() { return owner; }
  public String getStatus() { return status; }
  public void setName(String name) { this.name = name; }
  public void setOwner(String owner) { this.owner = owner; }
  public void setStatus(String status) { this.status = status; }
}

interface ItemRepo extends JpaRepository<Item, Long> {}

@RestController
@CrossOrigin
@RequestMapping("/api/job-portal/items")
class ItemController {
  private final ItemRepo repo;
  ItemController(ItemRepo repo) { this.repo = repo; }
  @GetMapping List<Item> all() { return repo.findAll(); }
  @PostMapping Item create(@RequestBody Item item) { return repo.save(item); }
  @PutMapping("/{id}") Item update(@PathVariable Long id, @RequestBody Item input) {
    Item item = repo.findById(id).orElseThrow();
    item.setName(input.getName());
    item.setOwner(input.getOwner());
    item.setStatus(input.getStatus());
    return repo.save(item);
  }
  @DeleteMapping("/{id}") void delete(@PathVariable Long id) { repo.deleteById(id); }
}
