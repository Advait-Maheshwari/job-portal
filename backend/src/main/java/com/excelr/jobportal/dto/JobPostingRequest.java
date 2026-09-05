package com.excelr.jobportal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record JobPostingRequest(
  @NotBlank @Size(min = 2, max = 120) String jobTitle,
  @NotBlank @Size(min = 2, max = 120) String companyName,
  @NotBlank @Size(max = 80) String jobType,
  @NotNull @PositiveOrZero BigDecimal salary,
  @NotBlank @Size(max = 40) String status
) {}
