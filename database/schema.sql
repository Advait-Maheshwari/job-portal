CREATE DATABASE IF NOT EXISTS job_portal;
USE job_portal;

CREATE TABLE IF NOT EXISTS user_accounts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  role VARCHAR(30) NOT NULL,
  created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS job_postings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  job_title VARCHAR(120) NOT NULL,
  company_name VARCHAR(120) NOT NULL,
  job_type VARCHAR(80) NOT NULL,
  salary DECIMAL(14,2) NOT NULL,
  status VARCHAR(40) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  INDEX idx_job_postings_name (job_title),
  INDEX idx_job_postings_status (status)
);
