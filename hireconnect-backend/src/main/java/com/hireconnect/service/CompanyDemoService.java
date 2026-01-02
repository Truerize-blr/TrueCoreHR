package com.hireconnect.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hireconnect.dto.request.CompanyDemoLoginRequest;
import com.hireconnect.dto.request.CompanyDemoRequest;
import com.hireconnect.dto.request.CompanyDemoUpdateRequest;
import com.hireconnect.dto.request.CompanyRegistrationLoginRequest;
import com.hireconnect.dto.request.CompanyRegistrationRequest;
import com.hireconnect.dto.response.CompanyDemoResponse;
import com.hireconnect.dto.response.CompanyRegistrationResponse;
import com.hireconnect.entity.CompanyDemoDetails;
import com.hireconnect.entity.CompanyDemoDetails.DemoStatus;
import com.hireconnect.entity.CompanyRegistration;
import com.hireconnect.repository.CompanyDemoRepository;
import com.hireconnect.repository.CompanyRegistrationRepository;
import com.hireconnect.security.JwtService;

@Service

public class CompanyDemoService {
    

    private final CompanyDemoRepository companyDemoRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CompanyRegistrationRepository companyRegistrationRepository;

    @Autowired
    public CompanyDemoService(
            CompanyDemoRepository companyDemoRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            CompanyRegistrationRepository companyRegistrationRepository
    ) {
        this.companyDemoRepository = companyDemoRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.companyRegistrationRepository = companyRegistrationRepository;
    }
    

    @Transactional
    public CompanyDemoResponse register(CompanyDemoRequest request) {
        // Validate request
        validateRegistrationRequest(request);
        
        // Check if email already exists
        if (companyDemoRepository.existsByCompanyEmail(request.getCompanyEmail())) {
            throw new RuntimeException("Company email already registered");
        }
        
        // Create new company demo details
        CompanyDemoDetails company = new CompanyDemoDetails();
        company.setFullName(request.getFullName());
        company.setCompanyEmail(request.getCompanyEmail());
        company.setPhoneNumber(request.getPhoneNumber());
        company.setCompanyName(request.getCompanyName());
        company.setDesignation(request.getDesignation());
        company.setStatus(DemoStatus.PENDING);
        
        // Save to database
        CompanyDemoDetails savedCompany = companyDemoRepository.save(company);
        
        // Convert to response
        return convertToResponse(savedCompany);
    }
    
   @Transactional
    public CompanyRegistrationResponse registerCompany(CompanyRegistrationRequest request) {
    // Validate request
    validateRegistrationRequest(request);
    
    // Check if email already exists
    if (companyRegistrationRepository.existsByCompanyEmail(request.getCompanyEmail())) {
        throw new RuntimeException("Company email already registered");
    }
    
    // Create new company registration
    CompanyRegistration company = new CompanyRegistration();
    company.setCompanyEmail(request.getCompanyEmail());
    company.setCompanyName(request.getCompanyName());
    company.setPassword(passwordEncoder.encode(request.getPassword()));
    company.setCompanyKey(request.getCompanyKey());
    
    // Set position/role - this must happen BEFORE saving
    if (request.getPosition() != null && !request.getPosition().isEmpty()) {
        try {
            company.setPosition(
                CompanyRegistration.role.valueOf(request.getPosition().toUpperCase())
            );
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + request.getPosition());
        }
    }
    // If no position provided, it will use the default ADMIN from the entity
    
    // Save to database
    CompanyRegistration savedCompany = companyRegistrationRepository.save(company);
    
    // Convert to response
    return convertToResponse(savedCompany);
}
   
   public CompanyRegistrationResponse loginRegisteredCompany(CompanyRegistrationLoginRequest request) {
	    // Validate that all required fields are provided
	    if (request.getCompanyEmail() == null || request.getCompanyEmail().trim().isEmpty()) {
	        throw new RuntimeException("Invalid credentials");
	    }
	    if (request.getCompanyKey() == null || request.getCompanyKey().trim().isEmpty()) {
	        throw new RuntimeException("Invalid credentials");
	    }
//	    if (request.getPosition() == null || request.getPosition().trim().isEmpty()) {
//	        throw new RuntimeException("Access denied");
//	    }
	    
	    // Find company by email
	    CompanyRegistration company = companyRegistrationRepository.findByCompanyEmail(request.getCompanyEmail());
	    
	    // Verify company key (encoded comparison)
	    if (!request.getCompanyKey().equals(company.getCompanyKey())) {
	        throw new RuntimeException("Invalid credentials");
	    }
	    
	    // Verify position/designation matches exactly
//	    try {
//	        CompanyRegistration.role requestedRole = CompanyRegistration.role.valueOf(
//	            request.getPosition().toUpperCase()
//	        );
//	        if (!company.getPosition().equals(requestedRole)) {
//	            throw new RuntimeException("Invalid credentials");
//	        }
//	    } catch (IllegalArgumentException e) {
//	        throw new RuntimeException("Invalid credentials");
//	    }
//	    
	    // All validations passed - Generate JWT token
	    String token = jwtService.generateToken(company.getCompanyEmail());
	    
	    // Convert to response
	    CompanyRegistrationResponse response = convertToResponse(company);
	    response.setToken(token);
	    
	    return response;
	}
    

    public CompanyDemoResponse login(CompanyDemoLoginRequest request) {
        // Find company by email
        CompanyDemoDetails company = companyDemoRepository.findByCompanyEmail(request.getCompanyEmail())
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), company.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        
        // Generate JWT token
        String token = jwtService.generateToken(company.getCompanyEmail());
        
        // Convert to response
        CompanyDemoResponse response = convertToResponse(company);
        response.setToken(token);
        
        return response;
    }
    

    public List<CompanyDemoResponse> getAllCompanies() {
        List<CompanyDemoDetails> companies = companyDemoRepository.findAllOrderByCreatedAtDesc();
        return companies.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    

    public CompanyDemoResponse getCompanyById(Long id) {
        CompanyDemoDetails company = companyDemoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Company not found with ID: " + id));
        return convertToResponse(company);
    }
    

    public List<CompanyDemoResponse> getCompaniesByStatus(String status) {
        try {
            DemoStatus demoStatus = DemoStatus.valueOf(status.toUpperCase());
            List<CompanyDemoDetails> companies = companyDemoRepository.findByStatus(demoStatus);
            return companies.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }
    public List<CompanyRegistrationResponse> getAllRegisteredCompanies() {
        List<CompanyRegistration> companies = companyRegistrationRepository.findAll();
        return companies.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    public List<CompanyDemoResponse> searchCompaniesByName(String companyName) {
        List<CompanyDemoDetails> companies = companyDemoRepository
            .findByCompanyNameContainingIgnoreCase(companyName);
        return companies.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
 
    @Transactional
    public CompanyDemoResponse updateCompany(Long id, CompanyDemoUpdateRequest request) {
        CompanyDemoDetails company = companyDemoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with ID: " + id));
            
            // Update fields if provided
            if (request.getFullName() != null && !request.getFullName().isEmpty() ) {
                company.setFullName(request.getFullName());
            }
            if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
                company.setPhoneNumber(request.getPhoneNumber());
            }
            if (request.getCompanyName() != null && !request.getCompanyName().isEmpty()) {
                company.setCompanyName(request.getCompanyName());
            }
            if (request.getDesignation() != null && !request.getDesignation().isEmpty()) {
                company.setDesignation(request.getDesignation());
            }
            if (request.getStatus() != null && !request.getStatus().isEmpty()) {
                try {
                    company.setStatus(DemoStatus.valueOf(request.getStatus().toUpperCase()));
                } catch (IllegalArgumentException e) {
                    throw new RuntimeException("Invalid status: " + request.getStatus());
                }
            }
            if (request.getRemarks() != null) {
                company.setRemarks(request.getRemarks());
            }
            
            // Save updated company
            CompanyDemoDetails updatedCompany = companyDemoRepository.save(company);
            
        return convertToResponse(updatedCompany);
    }
    

    @Transactional
    public CompanyDemoResponse updateStatus(Long id, String status, String remarks) {
        CompanyDemoDetails company = companyDemoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Company not found with ID: " + id));
        
        try {
            company.setStatus(DemoStatus.valueOf(status.toUpperCase()));
            if (remarks != null && !remarks.isEmpty()) {
                company.setRemarks(remarks);
            }
            
            CompanyDemoDetails updatedCompany = companyDemoRepository.save(company);
            return convertToResponse(updatedCompany);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }
    

    @Transactional
    public void deleteCompany(Long id) {
        CompanyDemoDetails company = companyDemoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Company not found with ID: " + id));
        
        companyDemoRepository.delete(company);
    }
    

    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalCompanies = companyDemoRepository.count();
        long pendingCount = companyDemoRepository.countByStatus(DemoStatus.PENDING);
        long approvedCount = companyDemoRepository.countByStatus(DemoStatus.APPROVED);
        long rejectedCount = companyDemoRepository.countByStatus(DemoStatus.REJECTED);
        long demoScheduledCount = companyDemoRepository.countByStatus(DemoStatus.DEMO_SCHEDULED);
        long demoCompletedCount = companyDemoRepository.countByStatus(DemoStatus.DEMO_COMPLETED);
        long convertedCount = companyDemoRepository.countByStatus(DemoStatus.CONVERTED);
        
        stats.put("totalCompanies", totalCompanies);
        stats.put("pending", pendingCount);
        stats.put("approved", approvedCount);
        stats.put("rejected", rejectedCount);
        stats.put("demoScheduled", demoScheduledCount);
        stats.put("demoCompleted", demoCompletedCount);
        stats.put("converted", convertedCount);
        
        return stats;
    }
    

    private void validateRegistrationRequest(CompanyDemoRequest request) {
        if (request.getFullName() == null || request.getFullName().trim().isEmpty()) {
            throw new RuntimeException("Full name is required");
        }
        if (request.getCompanyEmail() == null || request.getCompanyEmail().trim().isEmpty()) {
            throw new RuntimeException("Company email is required");
        }
        if (request.getPhoneNumber() == null || request.getPhoneNumber().trim().isEmpty()) {
            throw new RuntimeException("Phone number is required");
        }
        if (request.getCompanyName() == null || request.getCompanyName().trim().isEmpty()) {
            throw new RuntimeException("Company name is required");
        }
        if (request.getDesignation() == null || request.getDesignation().trim().isEmpty()) {
            throw new RuntimeException("Designation is required");
        }
        
        // Validate email format
        if (!request.getCompanyEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new RuntimeException("Invalid email format");
        }
    }
    
    private void validateRegistrationRequest(CompanyRegistrationRequest request) {

        if (request.getCompanyEmail() == null || request.getCompanyEmail().trim().isEmpty()) {
            throw new RuntimeException("Company email is required");
        }
        if (request.getCompanyName() == null || request.getCompanyName().trim().isEmpty()) {
            throw new RuntimeException("Company name is required");
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }
        if (request.getCompanyKey() == null || request.getCompanyKey().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }
        
        // Validate email format
        if (!request.getCompanyEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new RuntimeException("Invalid email format");
        }
    }

    private CompanyDemoResponse convertToResponse(CompanyDemoDetails company) {
        CompanyDemoResponse response = new CompanyDemoResponse();
        response.setId(company.getId());
        response.setFullName(company.getFullName());
        response.setCompanyEmail(company.getCompanyEmail());
        response.setPhoneNumber(company.getPhoneNumber());
        response.setCompanyName(company.getCompanyName());
        response.setDesignation(company.getDesignation());
        response.setStatus(company.getStatus().name());
        response.setCreatedAt(company.getCreatedAt());
        response.setUpdatedAt(company.getUpdatedAt());
        response.setRemarks(company.getRemarks());
        
        return response;
    }
    
    private CompanyRegistrationResponse convertToResponse(CompanyRegistration company) {
        CompanyRegistrationResponse response = new CompanyRegistrationResponse();
        response.setId(company.getId());
        response.setCompanyEmail(company.getCompanyEmail());
        response.setCompanyName(company.getCompanyName());
        response.setPassword(company.getPassword());
        response.setCompanyKey(company.getCompanyKey());
        response.setPosition(company.getPosition().name());
        return response;
    }
}