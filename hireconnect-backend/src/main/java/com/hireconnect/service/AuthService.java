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
        // Check if email exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPlainPassword(request.getPassword());
        user.setFullName(request.getFullName());
        user.setEmployeeId(request.getEmployeeId());
        user.setMobile(request.getMobile()); // ✅ Added position
        user.setDepartment(request.getDepartment());
        
        // ✅ FIXED: Use frontend role or default to EMPLOYEE
        if (request.getRole() != null && !request.getRole().trim().isEmpty()) {
            try {
                user.setRole(User.Role.valueOf(request.getRole().toUpperCase().trim()));
            } catch (IllegalArgumentException e) {
                user.setRole(User.Role.EMPLOYEE); // Fallback
            }
        } else {
            user.setRole(User.Role.EMPLOYEE); // Default if no role provided
        }
        
        user.setStatus(User.Status.ACTIVE);
        user.setOnboardingStatus(User.OnboardingStatus.NOT_STARTED);
        
        User savedUser = userRepository.save(user);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
            savedUser.getEmail(),
            savedUser.getPassword(),
            java.util.Collections.emptyList()
        ));
        
        return new AuthResponse(
        	    token,
        	    savedUser.getId(),
        	    savedUser.getEmail(),
        	    savedUser.getFullName(),     // ✅ fullName first
        	    savedUser.getEmployeeId(),  // ✅ employeeId now correct
        	    savedUser.getRole().name(),
        	    savedUser.getOnboardingStatus().name()
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
            user.getOnboardingStatus().name()
        );
    }
    
    public User getCurrentUser() {
        org.springframework.security.core.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Current user not found"));
    }
}
