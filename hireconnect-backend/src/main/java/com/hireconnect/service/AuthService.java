package com.hireconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hireconnect.dto.request.LoginRequest;
import com.hireconnect.dto.request.RegisterRequest;
import com.hireconnect.dto.response.AuthResponse;
import com.hireconnect.entity.User;
import com.hireconnect.repository.UserRepository;
import com.hireconnect.util.JwtUtil;

@Service
public class AuthService {
	
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    
public AuthResponse register(RegisterRequest request) {

    // 1. Check if email already exists
    if (userRepository.existsByEmail(request.getEmail())) {
        throw new RuntimeException("Email already registered");
    }

    // 2. Create new User
    User user = new User();
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword())); 
    // ❌ DO NOT store plain password in DB (security risk)
    // user.setPlainPassword(request.getPassword());

    user.setFullName(request.getFullName());
    user.setEmployeeId(request.getEmployeeId());
    user.setMobile(request.getMobile());
    user.setDepartment(request.getDepartment());
    user.setDob(request.getDob());
    user.setJoiningDate(request.getJoiningDate());

    // 3. Role handling (safe & clean)
    User.Role role = User.Role.EMPLOYEE; // default
    if (request.getRole() != null && !request.getRole().trim().isEmpty()) {
        try {
            role = User.Role.valueOf(request.getRole().toUpperCase().trim());
        } catch (IllegalArgumentException ignored) {
            role = User.Role.EMPLOYEE;
        }
    }
    user.setRole(role);

    // 4. Status defaults
    user.setStatus(User.Status.ACTIVE);
    user.setOnboardingStatus(User.OnboardingStatus.NOT_STARTED);

    // 5. Save user
    User savedUser = userRepository.save(user);

    // 6. Generate JWT token with role authority
    String token = jwtUtil.generateToken(
        new org.springframework.security.core.userdetails.User(
            savedUser.getEmail(),
            savedUser.getPassword(),
            java.util.List.of(
                new org.springframework.security.core.authority.SimpleGrantedAuthority(
                    "ROLE_" + savedUser.getRole().name()
                )
            )
        )
    );

    // 7. Return response
    return new AuthResponse(
        token,
        savedUser.getId(),
        savedUser.getEmail(),
        savedUser.getFullName(),
        savedUser.getEmployeeId(),
        savedUser.getRole().name(),
        savedUser.getOnboardingStatus().name(),
        savedUser.getDob(),
        savedUser.getJoiningDate()
    );
}


    
    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        // Get user details
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Generate JWT token
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            java.util.Collections.emptyList()
        ));
        
        // Update last login
        user.setLastLoginAt(java.time.LocalDateTime.now());
        userRepository.save(user);
        
        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getEmployeeId(),
                user.getRole().name(),
                user.getOnboardingStatus().name(),
                user.getDob(),
                user.getJoiningDate()
            );
    }
    
    public User getCurrentUser() {
        org.springframework.security.core.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Current user not found"));
    }
}
