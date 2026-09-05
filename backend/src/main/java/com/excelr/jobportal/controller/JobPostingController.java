package com.excelr.jobportal.controller;

import com.excelr.jobportal.dto.JobPostingRequest;
import com.excelr.jobportal.model.JobPosting;
import com.excelr.jobportal.service.JobPostingService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobs")
public class JobPostingController {
  private final JobPostingService service;

  public JobPostingController(JobPostingService service) { this.service = service; }

  @GetMapping
  public List<JobPosting> all(@RequestParam(defaultValue = "") String search) { return service.all(search); }

  @GetMapping("/{id}")
  public JobPosting one(@PathVariable Long id) { return service.one(id); }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public JobPosting create(@Valid @RequestBody JobPostingRequest request) { return service.create(request); }

  @PutMapping("/{id}")
  public JobPosting update(@PathVariable Long id, @Valid @RequestBody JobPostingRequest request) { return service.update(id, request); }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) { service.delete(id); }
}
