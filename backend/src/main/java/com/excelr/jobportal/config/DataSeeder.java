package com.excelr.jobportal.config;

import com.excelr.jobportal.model.Item;
import com.excelr.jobportal.repository.ItemRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
  @Bean CommandLineRunner seed(ItemRepository repo) {
    return args -> {
      if (repo.count() == 0) List.of(new Item("Java Developer", "Admin", "Active"), new Item("React Engineer", "Manager", "Review"), new Item("Spring Boot Intern", "Team", "Planned")).forEach(repo::save);
    };
  }
}
