package com.hireconnect.service;

import com.hireconnect.entity.AuditLog;
import com.hireconnect.repository.AuditLogRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {
    
    private  AuditLogRepository auditLogRepository;
    
    @Transactional
    public void createAuditLog(Long userId, Long performedBy, String action, String details) {
        AuditLog auditLog = new AuditLog();
        auditLog.setUserId(userId);
        auditLog.setPerformedBy(performedBy);
        auditLog.setAction(action);
        auditLog.setDetails(details);
        auditLog.setCreatedAt(LocalDateTime.now());
        auditLogRepository.save(auditLog);
    }
    
    @Transactional
    public void createAuditLog(Long userId, Long performedBy, String action, String details, 
                              String ipAddress, String userAgent) {
        AuditLog auditLog = new AuditLog();
        auditLog.setUserId(userId);
        auditLog.setPerformedBy(performedBy);
        auditLog.setAction(action);
        auditLog.setDetails(details);
        auditLog.setIpAddress(ipAddress);
        auditLog.setUserAgent(userAgent);
        auditLog.setCreatedAt(LocalDateTime.now());
        auditLogRepository.save(auditLog);
    }
    
    public List<AuditLog> getAuditLogsByUser(Long userId) {
        return auditLogRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    public List<AuditLog> getAuditLogsByPerformer(Long performedBy) {
        return auditLogRepository.findByPerformedByOrderByCreatedAtDesc(performedBy);
    }
}