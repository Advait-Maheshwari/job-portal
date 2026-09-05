package com.excelr.jobportal.service;

import com.excelr.jobportal.dto.JobPostingRequest;
import com.excelr.jobportal.exception.ResourceNotFoundException;
import com.excelr.jobportal.model.JobPosting;
import com.excelr.jobportal.repository.JobPostingRepository;
import java.util.List;
import java.util.Set;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JobPostingService {
  private static final Set<String> STATUSES = Set.of("Draft", "Open", "Paused", "Closed");
  private final JobPostingRepository repository;

  public JobPostingService(JobPostingRepository repository) { this.repository = repository; }

  @Transactional(readOnly = true)
  public List<JobPosting> all(String search) {
    List<JobPosting> records = repository.findAll(Sort.by(Sort.Direction.DESC, "updatedAt"));
    if (search == null || search.isBlank()) return records;
    String term = search.trim().toLowerCase();
    return records.stream().filter(record ->
      record.getJobTitle().toLowerCase().contains(term) ||
      record.getCompanyName().toLowerCase().contains(term) ||
      record.getJobType().toLowerCase().contains(term) ||
      record.getStatus().toLowerCase().contains(term)
    ).toList();
  }

  @Transactional(readOnly = true)
  public JobPosting one(Long id) {
    return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("JobPosting not found"));
  }

  @Transactional
  public JobPosting create(JobPostingRequest request) {
    validateStatus(request.status());
    return repository.save(new JobPosting(request.jobTitle(), request.companyName(), request.jobType(), request.salary(), request.status()));
  }

  @Transactional
  public JobPosting update(Long id, JobPostingRequest request) {
    validateStatus(request.status());
    JobPosting record = one(id);
    record.update(request.jobTitle(), request.companyName(), request.jobType(), request.salary(), request.status());
    return repository.save(record);
  }

  @Transactional
  public void delete(Long id) {
    JobPosting record = one(id);
    repository.delete(record);
  }

  private void validateStatus(String status) {
    if (!STATUSES.contains(status)) throw new IllegalArgumentException("Invalid status");
  }
}
