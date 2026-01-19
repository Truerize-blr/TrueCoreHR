package com.hireconnect.controller;

import com.hireconnect.dto.response.ApiResponse;
import com.hireconnect.entity.Reimbursement;
import com.hireconnect.service.FinanceService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reimbursements")
@CrossOrigin(origins = "*")
public class ReimbursementController {
    
	@Autowired
    private  FinanceService financeService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<Reimbursement>>> getReimbursements() {
        try {
            List<Reimbursement> reimbursements = financeService.getReimbursements();
            return ResponseEntity.ok(ApiResponse.success("Reimbursements fetched", reimbursements));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Reimbursement>>> getAllReimbursements() {
        try {
            List<Reimbursement> reimbursements = financeService.getAllReimbursements();
            return ResponseEntity.ok(ApiResponse.success("All reimbursements fetched", reimbursements));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Reimbursement>> createReimbursement(@RequestBody Reimbursement reimbursement) {
        try {
            Reimbursement created = financeService.createReimbursement(reimbursement);
            return ResponseEntity.ok(ApiResponse.success("Reimbursement request submitted", created));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> approveReimbursement(
            @PathVariable Long id,
            @RequestBody Map<String, Long> request) {
        try {
            Long approvedBy = request.get("approvedBy");
            financeService.approveReimbursement(id, approvedBy);
            return ResponseEntity.ok(ApiResponse.success("Reimbursement approved", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> rejectReimbursement(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        try {
            Long approvedBy = Long.parseLong(request.get("approvedBy").toString());
            String reason = (String) request.get("rejectionReason");
            financeService.rejectReimbursement(id, approvedBy, reason);
            return ResponseEntity.ok(ApiResponse.success("Reimbursement rejected", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/mark-paid")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> markAsPaid(@PathVariable Long id) {
        try {
            financeService.markReimbursementAsPaid(id);
            return ResponseEntity.ok(ApiResponse.success("Marked as paid", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}