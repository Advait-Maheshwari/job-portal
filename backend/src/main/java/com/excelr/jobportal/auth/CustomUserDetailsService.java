package com.excelr.jobportal.auth;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  private final UserAccountRepository repository;
  public CustomUserDetailsService(UserAccountRepository repository) { this.repository = repository; }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    UserAccount account = repository.findByEmailIgnoreCase(email)
      .orElseThrow(() -> new UsernameNotFoundException("Account not found"));
    return User.withUsername(account.getEmail()).password(account.getPasswordHash()).roles(account.getRole()).build();
  }
}
