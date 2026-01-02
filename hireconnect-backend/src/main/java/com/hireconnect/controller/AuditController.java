package com.hireconnect.controller;

import com.hireconnect.dto.response.ApiResponse;
import com.hireconnect.entity.AuditLog;
import com.hireconnect.service.AuditService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AuditController {
    
	@Autowired
    private  AuditService auditService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<AuditLog>>> getUserAuditLogs(@PathVariable Long userId) {
        try {
            List<AuditLog> logs = auditService.getAuditLogsByUser(userId);
            return ResponseEntity.ok(ApiResponse.success("Audit logs fetched", logs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/performer/{performerId}")
    public ResponseEntity<ApiResponse<List<AuditLog>>> getPerformerAuditLogs(@PathVariable Long performerId) {
        try {
            List<AuditLog> logs = auditService.getAuditLogsByPerformer(performerId);
            return ResponseEntity.ok(ApiResponse.success("Audit logs fetched", logs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}