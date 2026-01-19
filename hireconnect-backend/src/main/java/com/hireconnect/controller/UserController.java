package com.hireconnect.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hireconnect.dto.response.ApiResponse;
import com.hireconnect.entity.User;
import com.hireconnect.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(ApiResponse.success("Users fetched", users));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(ApiResponse.success("User fetched", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getCurrentUser() {
        try {
            User user = userService.getCurrentUser();
            return ResponseEntity.ok(ApiResponse.success("Current user fetched", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(
            @PathVariable Long id,
            @RequestBody User user) {
        try {
            User updated = userService.updateUser(id, user);
            return ResponseEntity.ok(ApiResponse.success("User updated", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<User>> updateCurrentUser(@RequestBody User user) {
        try {
            User updated = userService.updateCurrentUser(user);
            return ResponseEntity.ok(ApiResponse.success("Profile updated", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // ========== SIMPLIFIED IMAGE UPLOAD ENDPOINTS (NO AUTH) ==========
    
    /**
     * Upload profile photo for any user by userId (NO AUTHENTICATION REQUIRED)
     */
    @PostMapping("/{userId}/upload-photo")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadUserPhotoSimple(
            @PathVariable Long userId,
            @RequestParam("photo") MultipartFile file) {
        try {
            String photoUrl = userService.uploadUserPhotoSimple(userId, file);
            Map<String, String> response = Map.of(
                "photoUrl", photoUrl,
                "message", "Profile photo uploaded successfully"
            );
            return ResponseEntity.ok(ApiResponse.success("Photo uploaded", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Upload photo using userId from request param (NO AUTHENTICATION REQUIRED)
     */
    @PostMapping("/me/upload-photo")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadPhotoWithUserId(
            @RequestParam("photo") MultipartFile file,
            @RequestParam(value = "userId", required = false) Long userId) {
        try {
            // If userId not provided, try to get from localStorage on frontend
            if (userId == null) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("userId is required"));
            }
            
            String photoUrl = userService.uploadUserPhotoSimple(userId, file);
            Map<String, String> response = Map.of(
                "photoUrl", photoUrl,
                "message", "Profile photo uploaded successfully"
            );
            return ResponseEntity.ok(ApiResponse.success("Photo uploaded", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Get user's profile photo URL (NO AUTHENTICATION REQUIRED)
     */
    @GetMapping("/{userId}/photo")
    public ResponseEntity<ApiResponse<Map<String, String>>> getUserPhoto(@PathVariable Long userId) {
        try {
            String photoUrl = userService.getUserPhotoUrl(userId);
            Map<String, String> response = Map.of("photoUrl", photoUrl != null ? photoUrl : "");
            return ResponseEntity.ok(ApiResponse.success("Photo URL fetched", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Delete user's profile photo (NO AUTHENTICATION REQUIRED)
     */
    @DeleteMapping("/{userId}/photo")
    public ResponseEntity<ApiResponse<String>> deleteUserPhotoSimple(@PathVariable Long userId) {
        try {
            userService.deleteUserPhotoSimple(userId);
            return ResponseEntity.ok(ApiResponse.success("Profile photo deleted", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // ========== EXISTING ENDPOINTS ==========
    
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(@RequestBody Map<String, String> request) {
        try {
            String oldPassword = request.get("oldPassword");
            String newPassword = request.get("newPassword");
            userService.changePassword(oldPassword, newPassword);
            return ResponseEntity.ok(ApiResponse.success("Password changed successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(ApiResponse.success("User deleted", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/role/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<User>>> getUsersByRole(@PathVariable String role) {
        try {
            List<User> users = userService.getUsersByRole(role);
            return ResponseEntity.ok(ApiResponse.success("Users fetched", users));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<User>>> getUsersByStatus(@PathVariable String status) {
        try {
            List<User> users = userService.getUsersByStatus(status);
            return ResponseEntity.ok(ApiResponse.success("Users fetched", users));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<User>>> searchUsers(@RequestParam String query) {
        try {
            List<User> users = userService.searchUsers(query);
            return ResponseEntity.ok(ApiResponse.success("Search results", users));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}