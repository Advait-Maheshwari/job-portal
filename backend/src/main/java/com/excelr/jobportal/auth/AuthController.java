package com.excelr.jobportal.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final UserAccountRepository repository;
  private final HttpSessionSecurityContextRepository contextRepository = new HttpSessionSecurityContextRepository();

  public AuthController(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserAccountRepository repository) {
    this.authenticationManager = authenticationManager;
    this.passwordEncoder = passwordEncoder;
    this.repository = repository;
  }

  @GetMapping("/csrf")
  public CsrfResponse csrf(CsrfToken token) { return new CsrfResponse(token.getToken()); }

  @PostMapping("/signup")
  @ResponseStatus(HttpStatus.CREATED)
  public UserResponse signup(@Valid @RequestBody SignupRequest request) {
    if (repository.existsByEmailIgnoreCase(request.email())) throw new IllegalArgumentException("Email is already registered");
    UserAccount account = repository.save(new UserAccount(request.fullName(), request.email(), passwordEncoder.encode(request.password()), "USER"));
    return UserResponse.from(account);
  }

  @PostMapping("/login")
  public UserResponse login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
    SecurityContext context = SecurityContextHolder.createEmptyContext();
    context.setAuthentication(authentication);
    SecurityContextHolder.setContext(context);
    httpRequest.getSession(true);
    httpRequest.changeSessionId();
    contextRepository.saveContext(context, httpRequest, httpResponse);
    return responseFor(authentication.getName());
  }

  @GetMapping("/me")
  public ResponseEntity<UserResponse> me(Authentication authentication) {
    if (authentication == null || !authentication.isAuthenticated()) return ResponseEntity.noContent().build();
    return ResponseEntity.ok(responseFor(authentication.getName()));
  }

  private UserResponse responseFor(String email) {
    return repository.findByEmailIgnoreCase(email).map(UserResponse::from)
      .orElseThrow(() -> new IllegalArgumentException("Account is unavailable"));
  }

  public record CsrfResponse(String token) {}
  public record LoginRequest(@NotBlank @Email String email, @NotBlank @Size(min = 8, max = 72) String password) {}
  public record SignupRequest(@NotBlank @Size(min = 2, max = 80) String fullName, @NotBlank @Email @Size(max = 120) String email, @NotBlank @Size(min = 8, max = 72) String password) {}
  public record UserResponse(Long id, String fullName, String email, String role) {
    static UserResponse from(UserAccount account) { return new UserResponse(account.getId(), account.getFullName(), account.getEmail(), account.getRole()); }
  }
}
