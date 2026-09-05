package com.excelr.jobportal.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_accounts")
public class UserAccount {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(name = "full_name", nullable = false, length = 80) private String fullName;
  @Column(nullable = false, unique = true, length = 120) private String email;
  @Column(name = "password_hash", nullable = false, length = 100) private String passwordHash;
  @Column(nullable = false, length = 30) private String role;
  @Column(name = "created_at", nullable = false, updatable = false) private LocalDateTime createdAt;

  protected UserAccount() {}
  public UserAccount(String fullName, String email, String passwordHash, String role) {
    this.fullName = fullName.trim(); this.email = email.trim().toLowerCase(); this.passwordHash = passwordHash; this.role = role;
  }
  @PrePersist void created() { createdAt = LocalDateTime.now(); }
  public Long getId() { return id; }
  public String getFullName() { return fullName; }
  public String getEmail() { return email; }
  public String getPasswordHash() { return passwordHash; }
  public String getRole() { return role; }
}
