package com.hireconnect.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.hireconnect.entity.User;
import com.hireconnect.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Value("${file.upload-dir:uploads/profile-photos}")
    private String uploadDir;
    
    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;
    
    // ========== EXISTING METHODS ==========
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || 
            authentication.getPrincipal().equals("anonymousUser")) {
            throw new RuntimeException("User is not authenticated");
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        
        if (userDetails.getFullName() != null) {
            user.setFullName(userDetails.getFullName());
        }
        if (userDetails.getEmail() != null) {
            user.setEmail(userDetails.getEmail());
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
        if (userDetails.getEmployeeId() != null) {
            user.setEmployeeId(userDetails.getEmployeeId());
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
        
        if (!passwordEncoder.matches(oldPassword, currentUser.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        
        currentUser.setPassword(passwordEncoder.encode(newPassword));
        currentUser.setPlainPassword(newPassword);
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
    
    // ========== SIMPLIFIED IMAGE UPLOAD METHODS (NO AUTHENTICATION) ==========
    
    /**
     * Upload profile photo for any user - NO AUTHENTICATION REQUIRED
     */
    @Transactional
    public String uploadUserPhotoSimple(Long userId, MultipartFile file) {
        // Validate file
        validateImageFile(file);
        
        // Get user
        User user = getUserById(userId);
        
        // Delete old photo if exists
        deleteOldPhotoFile(user.getProfilePhotoUrl());
        
        // Save new photo
        String fileName = saveFile(file, userId);
        String photoUrl = baseUrl + "/uploads/profile-photos/" + fileName;
        
        // Update user
        user.setProfilePhotoUrl(photoUrl);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        
        System.out.println("Photo uploaded successfully for user: " + userId);
        System.out.println("Photo URL: " + photoUrl);
        
        return photoUrl;
    }
    
    /**
     * Get user's profile photo URL - NO AUTHENTICATION REQUIRED
     */
    public String getUserPhotoUrl(Long userId) {
        User user = getUserById(userId);
        return user.getProfilePhotoUrl();
    }
    
    /**
     * Delete user's profile photo - NO AUTHENTICATION REQUIRED
     */
    @Transactional
    public void deleteUserPhotoSimple(Long userId) {
        User user = getUserById(userId);
        
        if (user.getProfilePhotoUrl() != null) {
            deleteOldPhotoFile(user.getProfilePhotoUrl());
            user.setProfilePhotoUrl(null);
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
        }
    }
    
    // ========== HELPER METHODS ==========
    
    /**
     * Validate uploaded image file
     */
    private void validateImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Please select a file to upload");
        }
        
        // Check file size (max 5MB)
        long maxSize = 5 * 1024 * 1024; // 5MB
        if (file.getSize() > maxSize) {
            throw new RuntimeException("File size must be less than 5MB");
        }
        
        // Check file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new RuntimeException("Only image files are allowed");
        }
        
        // Validate specific image types
        String[] allowedTypes = {"image/jpeg", "image/jpg", "image/png", "image/gif"};
        boolean isValidType = false;
        for (String type : allowedTypes) {
            if (type.equals(contentType)) {
                isValidType = true;
                break;
            }
        }
        
        if (!isValidType) {
            throw new RuntimeException("Only JPEG, PNG, and GIF images are allowed");
        }
    }
    
    /**
     * Save file to disk and return filename
     */
    private String saveFile(MultipartFile file, Long userId) {
        try {
            // Create upload directory if not exists
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                System.out.println("Created upload directory: " + uploadPath.toAbsolutePath());
            }
            
            // Generate unique filename
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = "user_" + userId + "_" + UUID.randomUUID().toString() + extension;
            
            // Save file
            Path targetLocation = uploadPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            
            System.out.println("File saved to: " + targetLocation.toAbsolutePath());
            
            return uniqueFilename;
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage());
        }
    }
    
    /**
     * Delete old photo file from disk
     */
    private void deleteOldPhotoFile(String photoUrl) {
        if (photoUrl != null && !photoUrl.isEmpty()) {
            try {
                // Extract filename from URL
                String filename = photoUrl.substring(photoUrl.lastIndexOf("/") + 1);
                Path filePath = Paths.get(uploadDir).resolve(filename);
                
                // Delete file if exists
                Files.deleteIfExists(filePath);
                System.out.println("Deleted old photo: " + filePath.toAbsolutePath());
            } catch (IOException e) {
                // Log error but don't throw exception
                System.err.println("Failed to delete old photo: " + e.getMessage());
            }
        }
    }
}