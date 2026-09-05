package com.excelr.jobportal.config;

import com.excelr.jobportal.auth.UserAccount;
import com.excelr.jobportal.auth.UserAccountRepository;
import com.excelr.jobportal.model.JobPosting;
import com.excelr.jobportal.repository.JobPostingRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
  @Bean
  CommandLineRunner seed(JobPostingRepository records, UserAccountRepository users, PasswordEncoder encoder,
    @Value("${app.seed.enabled}") boolean enabled,
    @Value("${app.demo.admin-email}") String adminEmail,
    @Value("${app.demo.admin-password}") String adminPassword) {
    return args -> {
      if (!enabled) return;
      if (!users.existsByEmailIgnoreCase(adminEmail)) users.save(new UserAccount("Demo Administrator", adminEmail, encoder.encode(adminPassword), "ADMIN"));
      if (records.count() == 0) records.saveAll(List.of(
        new JobPosting("Java Developer", "Northstar Labs", "Full-time", new BigDecimal("900000.00"), "Open"),
        new JobPosting("React Intern", "PixelWorks", "Internship", new BigDecimal("240000.00"), "Open"),
        new JobPosting("QA Engineer", "Reliant Systems", "Contract", new BigDecimal("650000.00"), "Paused")
      ));
    };
  }
}
