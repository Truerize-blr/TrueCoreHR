package com.hireconnect.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hireconnect.entity.User;
import com.hireconnect.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
public class UserService {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  PasswordEncoder passwordEncoder;
    
  
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    public User getCurrentUser() {
        Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
            !authentication.isAuthenticated() ||
            authentication.getPrincipal().equals("anonymousUser")) {
            throw new RuntimeException("User is not authenticated");
        }

        String email = authentication.getName(); // or username

        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }


    
    @Transactional
    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        
        if (userDetails.getFullName() != null) {
            user.setFullName(userDetails.getFullName());
        }
        if (userDetails.getMobile() != null) {
            user.setMobile(userDetails.getMobile());
        }
        if (userDetails.getPosition() != null) {
            user.setPosition(userDetails.getPosition());
        }
        if (userDetails.getDepartment() != null) {
            user.setDepartment(userDetails.getDepartment());
        }
        if (userDetails.getStatus() != null) {
            user.setStatus(userDetails.getStatus());
        }
        
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }
    
    @Transactional
    public User updateCurrentUser(User userDetails) {
        User currentUser = getCurrentUser();
        return updateUser(currentUser.getId(), userDetails);
    }
    
    @Transactional
    public void changePassword(String oldPassword, String newPassword) {
        User currentUser = getCurrentUser();
        
        // Verify old password
        if (!passwordEncoder.matches(oldPassword, currentUser.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        
        // Update password
        currentUser.setPassword(passwordEncoder.encode(newPassword));
        currentUser.setPlainPassword(newPassword); // Store plain (not recommended in production)
        currentUser.setUpdatedAt(LocalDateTime.now());
        
        userRepository.save(currentUser);
    }
    
    @Transactional
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
    
    public List<User> getUsersByRole(String roleStr) {
        User.Role role = User.Role.valueOf(roleStr.toUpperCase());
        return userRepository.findByRole(role);
    }
    
    public List<User> getUsersByStatus(String statusStr) {
        User.Status status = User.Status.valueOf(statusStr.toUpperCase());
        return userRepository.findByStatus(status);
    }
    
    public List<User> searchUsers(String query) {
        return userRepository.searchUsers(query);
    }
    
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
    
}
    
    

    