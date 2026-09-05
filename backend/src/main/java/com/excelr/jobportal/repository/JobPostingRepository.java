package com.excelr.jobportal.repository;

import com.excelr.jobportal.model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {}
