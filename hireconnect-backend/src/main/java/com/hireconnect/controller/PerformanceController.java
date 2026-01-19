package com.hireconnect.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.hireconnect.dto.request.PerformanceRequest;
import com.hireconnect.dto.response.ApiResponse;
import com.hireconnect.dto.response.PerformanceResponse;
import com.hireconnect.service.PerformanceService;

@RestController
@RequestMapping("/api/performance")
@CrossOrigin(origins = "*")
public class PerformanceController {
    @Autowired
    private PerformanceService performanceService;
    
    // Get all performance data (Admin only)
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<PerformanceResponse>>> getAllPerformance() {
        try {
            System.out.println("GET /api/performance/all - Fetching all performance data");
            List<PerformanceResponse> data = performanceService.getAllPerformance();
            System.out.println("Successfully fetched " + data.size() + " performance records");
            return ResponseEntity.ok(ApiResponse.success("Performance data fetched successfully", data));
        } catch (Exception e) {
            System.err.println("Error in getAllPerformance: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to fetch performance data: " + e.getMessage()));
        }
    }
    
    // Get performance by employee ID
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<ApiResponse<PerformanceResponse>> getPerformanceByEmployeeId(@PathVariable String employeeId) {
        try {
            System.out.println("GET /api/performance/employee/" + employeeId);
            PerformanceResponse data = performanceService.getPerformanceByEmployeeId(employeeId);
            return ResponseEntity.ok(ApiResponse.success("Performance data fetched successfully", data));
        } catch (Exception e) {
            System.err.println("Error in getPerformanceByEmployeeId: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Get performance by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<PerformanceResponse>> getPerformanceByUserId(@PathVariable Long userId) {
        try {
            System.out.println("GET /api/performance/user/" + userId);
            PerformanceResponse data = performanceService.getPerformanceByUserId(userId);
            return ResponseEntity.ok(ApiResponse.success("Performance data fetched successfully", data));
        } catch (Exception e) {
            System.err.println("Error in getPerformanceByUserId: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Get current logged-in user's performance
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<PerformanceResponse>> getCurrentUserPerformance() {
        try {
            System.out.println("GET /api/performance/me - Fetching current user's performance");
            PerformanceResponse data = performanceService.getCurrentUserPerformance();
            System.out.println("Successfully fetched performance data for current user");
            return ResponseEntity.ok(ApiResponse.success("Performance data fetched successfully", data));
        } catch (Exception e) {
            System.err.println("Error in getCurrentUserPerformance: " + e.getMessage());
            e.printStackTrace();
            
            // Determine appropriate status code
            HttpStatus status = e.getMessage().contains("not found") 
                    ? HttpStatus.NOT_FOUND 
                    : HttpStatus.INTERNAL_SERVER_ERROR;
            
            return ResponseEntity.status(status)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Create new performance record (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PerformanceResponse>> createPerformance(@RequestBody PerformanceRequest request) {
        try {
            System.out.println("POST /api/performance - Creating performance record");
            System.out.println("Request: " + request);
            PerformanceResponse created = performanceService.createPerformance(request);
            System.out.println("Successfully created performance record with ID: " + created.getId());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Performance record created successfully", created));
        } catch (Exception e) {
            System.err.println("Error in createPerformance: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Update performance record (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PerformanceResponse>> updatePerformance(
            @PathVariable Long id,
            @RequestBody PerformanceRequest request) {
        try {
            System.out.println("PUT /api/performance/" + id + " - Updating performance record");
            PerformanceResponse updated = performanceService.updatePerformance(id, request);
            System.out.println("Successfully updated performance record");
            return ResponseEntity.ok(ApiResponse.success("Performance record updated successfully", updated));
        } catch (Exception e) {
            System.err.println("Error in updatePerformance: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Validate or revoke validation (Admin only)
    @PutMapping("/validate/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> validatePerformance(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> request) {
        try {
            System.out.println("PUT /api/performance/validate/" + id);
            Boolean validated = request.get("validated");
            performanceService.setValidationStatus(id, validated);
            String message = validated ? "Performance validated successfully" : "Validation revoked successfully";
            System.out.println(message);
            return ResponseEntity.ok(ApiResponse.success(message, null));
        } catch (Exception e) {
            System.err.println("Error in validatePerformance: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Delete performance record (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deletePerformance(@PathVariable Long id) {
        try {
            System.out.println("DELETE /api/performance/" + id);
            performanceService.deletePerformance(id);
            System.out.println("Successfully deleted performance record");
            return ResponseEntity.ok(ApiResponse.success("Performance record deleted successfully", null));
        } catch (Exception e) {
            System.err.println("Error in deletePerformance: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Search performance
    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<PerformanceResponse>>> searchPerformance(@RequestParam String query) {
        try {
            System.out.println("GET /api/performance/search?query=" + query);
            List<PerformanceResponse> results = performanceService.searchPerformance(query);
            return ResponseEntity.ok(ApiResponse.success("Search results fetched successfully", results));
        } catch (Exception e) {
            System.err.println("Error in searchPerformance: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Filter by department
    @GetMapping("/department/{department}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<PerformanceResponse>>> filterByDepartment(@PathVariable String department) {
        try {
            System.out.println("GET /api/performance/department/" + department);
            List<PerformanceResponse> results = performanceService.filterByDepartment(department);
            return ResponseEntity.ok(ApiResponse.success("Filtered results fetched successfully", results));
        } catch (Exception e) {
            System.err.println("Error in filterByDepartment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Filter by status
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<PerformanceResponse>>> filterByStatus(@PathVariable String status) {
        try {
            System.out.println("GET /api/performance/status/" + status);
            List<PerformanceResponse> results = performanceService.filterByStatus(status);
            return ResponseEntity.ok(ApiResponse.success("Filtered results fetched successfully", results));
        } catch (Exception e) {
            System.err.println("Error in filterByStatus: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // Add feedback to performance
    @PostMapping("/{id}/feedback")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> addFeedback(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        try {
            System.out.println("POST /api/performance/" + id + "/feedback");
            performanceService.addFeedback(
                    id,
                    request.get("title"),
                    request.get("comment"),
                    request.get("author")
            );
            System.out.println("Successfully added feedback");
            return ResponseEntity.ok(ApiResponse.success("Feedback added successfully", null));
        } catch (Exception e) {
            System.err.println("Error in addFeedback: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}