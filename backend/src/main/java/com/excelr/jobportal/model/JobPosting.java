package com.excelr.jobportal.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_postings")
public class JobPosting {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "job_title", nullable = false, length = 120)
  private String jobTitle;

  @Column(name = "company_name", nullable = false, length = 120)
  private String companyName;

  @Column(name = "job_type", nullable = false, length = 80)
  private String jobType;

  @Column(name = "salary", nullable = false, precision = 14, scale = 2)
  private BigDecimal salary;

  @Column(nullable = false, length = 40)
  private String status;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  protected JobPosting() {}

  public JobPosting(String jobTitle, String companyName, String jobType, BigDecimal salary, String status) {
    update(jobTitle, companyName, jobType, salary, status);
  }

  public void update(String jobTitle, String companyName, String jobType, BigDecimal salary, String status) {
    this.jobTitle = jobTitle.trim();
    this.companyName = companyName.trim();
    this.jobType = jobType;
    this.salary = salary;
    this.status = status;
  }

  @PrePersist
  void created() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }

  @PreUpdate
  void updated() { updatedAt = LocalDateTime.now(); }

  public Long getId() { return id; }
  public String getJobTitle() { return jobTitle; }
  public String getCompanyName() { return companyName; }
  public String getJobType() { return jobType; }
  public BigDecimal getSalary() { return salary; }
  public String getStatus() { return status; }
  public LocalDateTime getCreatedAt() { return createdAt; }
  public LocalDateTime getUpdatedAt() { return updatedAt; }
}
