package com.hireconnect.controller;

import com.hireconnect.dto.response.ApiResponse;
import com.hireconnect.entity.TaxDeclaration;
import com.hireconnect.service.FinanceService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tax-declarations")
@CrossOrigin(origins = "*")
public class TaxDeclarationController {
    
	@Autowired
    private  FinanceService financeService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<TaxDeclaration>>> getTaxDeclarations() {
        try {
            List<TaxDeclaration> declarations = financeService.getTaxDeclarations();
            return ResponseEntity.ok(ApiResponse.success("Tax declarations fetched", declarations));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<TaxDeclaration>>> getAllTaxDeclarations() {
        try {
            List<TaxDeclaration> declarations = financeService.getAllTaxDeclarations();
            return ResponseEntity.ok(ApiResponse.success("All tax declarations fetched", declarations));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<TaxDeclaration>> createTaxDeclaration(@RequestBody TaxDeclaration taxDeclaration) {
        try {
            TaxDeclaration created = financeService.createTaxDeclaration(taxDeclaration);
            return ResponseEntity.ok(ApiResponse.success("Tax declaration submitted", created));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> approveTaxDeclaration(
            @PathVariable Long id,
            @RequestBody Map<String, Long> request) {
        try {
            Long approvedBy = request.get("approvedBy");
            financeService.approveTaxDeclaration(id, approvedBy);
            return ResponseEntity.ok(ApiResponse.success("Tax declaration approved", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> rejectTaxDeclaration(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        try {
            Long approvedBy = Long.parseLong(request.get("approvedBy").toString());
            String reason = (String) request.get("rejectionReason");
            financeService.rejectTaxDeclaration(id, approvedBy, reason);
            return ResponseEntity.ok(ApiResponse.success("Tax declaration rejected", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}