package com.hireconnect.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.hireconnect.entity.Notification;

public class NotificationRequest {

    private String title;
    private String message;
    private String priority; // NORMAL, HIGH, LOW
    private String status;   // DRAFT, PUBLISHED

    private boolean pinned;
    private boolean reqAck;
    private boolean sendEmail;
    private boolean sendPush;

    // Targeting
    private String targetType; // ALL, DEPT, SPECIFIC
    private List<String> targetDepts;
    private List<String> targetEmployeeIds;

    // Date Handling
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime scheduledAt;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime expiresAt;

    // -------- Getters & Setters --------

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isPinned() {
        return pinned;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }

    public boolean isReqAck() {
        return reqAck;
    }

    public void setReqAck(boolean reqAck) {
        this.reqAck = reqAck;
    }

    public boolean isSendEmail() {
        return sendEmail;
    }

    public void setSendEmail(boolean sendEmail) {
        this.sendEmail = sendEmail;
    }

    public boolean isSendPush() {
        return sendPush;
    }

    public void setSendPush(boolean sendPush) {
        this.sendPush = sendPush;
    }

    public String getTargetType() {
        return targetType;
    }

    public void setTargetType(String targetType) {
        this.targetType = targetType;
    }

    public List<String> getTargetDepts() {
        return targetDepts;
    }

    public void setTargetDepts(List<String> targetDepts) {
        this.targetDepts = targetDepts;
    }

    public List<String> getTargetEmployeeIds() {
        return targetEmployeeIds;
    }

    public void setTargetEmployeeIds(List<String> targetEmployeeIds) {
        this.targetEmployeeIds = targetEmployeeIds;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    // -------- DTO → Entity Mapper (Option A safe) --------

    public Notification toEntity() {
        Notification n = new Notification();

        n.setTitle(this.title);
        n.setMessage(this.message);
        n.setPriority(Notification.Priority.valueOf(this.priority));
        n.setStatus(Notification.Status.valueOf(this.status));
        n.setPinned(this.pinned);
        n.setReqAck(this.reqAck);
        n.setSendEmail(this.sendEmail);
        n.setSendPush(this.sendPush);
        n.setTargetType(Notification.TargetType.valueOf(this.targetType));
        n.setTargetDepts(this.targetDepts);
        n.setTargetEmployeeIds(this.targetEmployeeIds);
        n.setScheduledAt(this.scheduledAt);
        n.setExpiresAt(this.expiresAt);
        
        return n;
    }
}