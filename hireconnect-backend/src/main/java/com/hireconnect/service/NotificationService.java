package com.hireconnect.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hireconnect.dto.request.NotificationRequest;
import com.hireconnect.dto.response.AdminNotificationResponse;
import com.hireconnect.dto.response.EmployeeNotificationResponse;
import com.hireconnect.entity.Notification;
import com.hireconnect.entity.UserNotification;
import com.hireconnect.repository.NotificationRepository;
import com.hireconnect.repository.UserNotificationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private NotificationRepository notificationRepo;
    private  UserNotificationRepository userNotificationRepo; 
@Autowired
    public NotificationService(NotificationRepository notificationRepo,
			UserNotificationRepository userNotificationRepo) {
		super();
		this.notificationRepo = notificationRepo;
		this.userNotificationRepo = userNotificationRepo;
	}

	// Local storage (replace with S3 in prod)
    private final Path fileStorageLocation =
            Paths.get("uploads").toAbsolutePath().normalize();


    @Transactional
    public Notification createNotification(NotificationRequest request, MultipartFile file)
            throws IOException {

        Notification notif = request.toEntity();

        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Files.createDirectories(fileStorageLocation);
            Files.copy(
                    file.getInputStream(),
                    fileStorageLocation.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING
            );

            notif.setAttachmentName(file.getOriginalFilename());
            notif.setAttachmentPath(fileName);
        }

        return notificationRepo.save(notif);
    }

    @Transactional
    public void deleteNotification(Long id) {
        notificationRepo.deleteById(id);
    }

    @Transactional
    public void archiveNotification(Long id) {
        Notification n = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setStatus(Notification.Status.ARCHIVED);
        notificationRepo.save(n);
    }

    @Transactional(readOnly = true)
    public List<AdminNotificationResponse> getAllAdminNotifications() {
        return notificationRepo.findAllByOrderByCreatedAtDesc()
            .stream()
            .map(n -> {
                AdminNotificationResponse dto = new AdminNotificationResponse();
                dto.setId(n.getId());
                dto.setTitle(n.getTitle());
                dto.setMessage(n.getMessage());
                dto.setPriority(n.getPriority().name());
                dto.setStatus(n.getStatus().name());
                dto.setPinned(n.isPinned());
                dto.setReqAck(n.isReqAck());
                dto.setTargetDepts(
                	    n.getTargetDepts() == null ? List.of() : List.copyOf(n.getTargetDepts())
                	);

                	dto.setTargetEmployeeIds(
                	    n.getTargetEmployeeIds() == null ? List.of() : List.copyOf(n.getTargetEmployeeIds())
                	);

                dto.setCreatedAt(n.getCreatedAt());
                dto.setScheduledAt(n.getScheduledAt());
                dto.setExpiresAt(n.getExpiresAt());
                dto.setAttachmentName(n.getAttachmentName());
                return dto;
            })
            .toList();
    }

    // ================= EMPLOYEE METHODS =================

    public List<EmployeeNotificationResponse> getNotificationsForEmployee(
            String empId, String dept) {

        List<Notification> notifications =
                notificationRepo.findRelevantNotifications(
                        empId, dept, LocalDateTime.now()
                );

        return notifications.stream()
                .map(n -> {
                    UserNotification interaction =
                            userNotificationRepo
                                    .findByNotificationIdAndEmployeeId(n.getId(), empId)
                                    .orElseGet(() -> createEmptyInteraction(n.getId(), empId));

                    if (interaction.isDismissed()) return null;

                    EmployeeNotificationResponse dto =
                            new EmployeeNotificationResponse();

                    dto.setId(n.getId());
                    dto.setTitle(n.getTitle());
                    dto.setMessage(n.getMessage());
                    dto.setPriority(n.getPriority().name());
                    dto.setPinned(n.isPinned());
                    dto.setReqAck(n.isReqAck());
                    dto.setAttachmentName(n.getAttachmentName());

                    if (n.getAttachmentName() != null) {
                        dto.setAttachmentUrl(
                                "http://localhost:8080/api/files/download/" +
                                        n.getAttachmentPath()
                        );
                    }

                    dto.setCreatedAt(n.getCreatedAt());
                    dto.setExpiresAt(n.getExpiresAt());
                    dto.setRead(interaction.isRead());
                    dto.setAcknowledged(interaction.isAcknowledged());

                    return dto;
                })
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(Long notificationId, String empId) {
        UserNotification interaction = getOrCreateInteraction(notificationId, empId);

        if (!interaction.isRead()) {
            interaction.setRead(true);
            interaction.setReadAt(LocalDateTime.now());
            userNotificationRepo.save(interaction);
        }
    }

    @Transactional
    public void markAllRead(String empId) {
        String fallbackDept = "ALL";

        List<Notification> notifications =
                notificationRepo.findRelevantNotifications(
                        empId, fallbackDept, LocalDateTime.now()
                );

        for (Notification n : notifications) {
            UserNotification interaction = getOrCreateInteraction(n.getId(), empId);

            if (!interaction.isRead()) {
                interaction.setRead(true);
                interaction.setReadAt(LocalDateTime.now());
                userNotificationRepo.save(interaction);
            }
        }
    }

    @Transactional
    public void acknowledge(Long notificationId, String empId) {
        UserNotification interaction = getOrCreateInteraction(notificationId, empId);

        interaction.setAcknowledged(true);
        interaction.setAcknowledgedAt(LocalDateTime.now());
        interaction.setRead(true);

        userNotificationRepo.save(interaction);
    }

    @Transactional
    public void dismiss(Long notificationId, String empId) {
        UserNotification interaction = getOrCreateInteraction(notificationId, empId);
        interaction.setDismissed(true);
        userNotificationRepo.save(interaction);
    }
    
    @Transactional
    public Notification updateNotification(
            Long id,
            NotificationRequest request,
            MultipartFile file
    ) throws IOException {

        Notification existing = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        // Update fields (same mapping as create)
        existing.setTitle(request.getTitle());
        existing.setMessage(request.getMessage());
        existing.setPriority(Notification.Priority.valueOf(request.getPriority()));
        existing.setStatus(Notification.Status.valueOf(request.getStatus()));
        existing.setPinned(request.isPinned());
        existing.setReqAck(request.isReqAck());
        existing.setSendEmail(request.isSendEmail());
        existing.setSendPush(request.isSendPush());
        existing.setTargetType(Notification.TargetType.valueOf(request.getTargetType()));
        existing.setTargetDepts(request.getTargetDepts());
        existing.setTargetEmployeeIds(request.getTargetEmployeeIds());
        existing.setScheduledAt(request.getScheduledAt());
        existing.setExpiresAt(request.getExpiresAt());

        // Handle attachment (optional)
        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Files.createDirectories(fileStorageLocation);
            Files.copy(
                    file.getInputStream(),
                    fileStorageLocation.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING
            );

            existing.setAttachmentName(file.getOriginalFilename());
            existing.setAttachmentPath(fileName);
        }

        return notificationRepo.save(existing);
    }


    // ================= HELPERS =================

    private UserNotification getOrCreateInteraction(Long notifId, String empId) {
        return userNotificationRepo
                .findByNotificationIdAndEmployeeId(notifId, empId)
                .orElseGet(() -> createEmptyInteraction(notifId, empId));
    }

    private UserNotification createEmptyInteraction(Long notifId, String empId) {
        UserNotification un = new UserNotification();
        un.setNotificationId(notifId);
        un.setEmployeeId(empId);
        un.setRead(false);
        un.setAcknowledged(false);
        un.setDismissed(false);
        return un;
    }
}