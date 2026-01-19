package com.hireconnect.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hireconnect.dto.request.PerformanceRequest;
import com.hireconnect.dto.response.FeedbackResponse;
import com.hireconnect.dto.response.PerformanceResponse;
import com.hireconnect.entity.PerformanceData;
import com.hireconnect.entity.PerformanceFeedback;
import com.hireconnect.entity.User;
import com.hireconnect.repository.PerformanceFeedbackRepository;
import com.hireconnect.repository.PerformanceRepository;
import com.hireconnect.repository.UserRepository;

@Service
public class PerformanceService {

    @Autowired
    private PerformanceRepository performanceRepository;

    @Autowired
    private PerformanceFeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    /* ================= READ ================= */

    @Transactional(readOnly = true)
    public List<PerformanceResponse> getAllPerformance() {
        try {
            List<PerformanceData> dataList = performanceRepository.findAllWithFeedback();
            return dataList.stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error fetching all performance: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch performance data: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public PerformanceResponse getPerformanceByEmployeeId(String employeeId) {
        try {
            PerformanceData data = performanceRepository.findByEmployeeIdWithFeedback(employeeId)
                    .orElseThrow(() -> new RuntimeException("Performance not found for employee: " + employeeId));
            return convertToResponse(data);
        } catch (Exception e) {
            System.err.println("Error fetching performance for employee " + employeeId + ": " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch performance data: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public PerformanceResponse getPerformanceByUserId(Long userId) {
        try {
            System.out.println("Fetching performance for user ID: " + userId);
            
            PerformanceData data = performanceRepository.findByUserIdWithFeedback(userId)
                    .orElseThrow(() -> new RuntimeException("Performance not found for user ID: " + userId));
            
            System.out.println("Found performance data: " + data.getId());
            return convertToResponse(data);
        } catch (Exception e) {
            System.err.println("Error fetching performance for user " + userId + ": " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch performance data: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public PerformanceResponse getCurrentUserPerformance() {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            System.out.println("Getting performance for logged-in user: " + email);
            
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
            
            System.out.println("Found user with ID: " + user.getId());
            
            // Check if performance record exists
            boolean exists = performanceRepository.existsByUserId(user.getId());
            if (!exists) {
                throw new RuntimeException("No performance record found for this user. Please contact your administrator.");
            }
            
            return getPerformanceByUserId(user.getId());
        } catch (Exception e) {
            System.err.println("Error in getCurrentUserPerformance: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /* ================= CREATE ================= */

    @Transactional
    public PerformanceResponse createPerformance(PerformanceRequest request) {
        try {
            if (performanceRepository.existsByEmployeeId(request.getEmployeeId())) {
                throw new RuntimeException("Performance record already exists for employee ID: " + request.getEmployeeId());
            }

            // Validate required fields
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                throw new RuntimeException("Employee name is required");
            }

            if (request.getUserId() == null) {
                throw new RuntimeException("User ID is required");
            }

            // Check if user already has a performance record
            if (performanceRepository.existsByUserId(request.getUserId())) {
                throw new RuntimeException("Performance record already exists for this user");
            }

            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

            PerformanceData data = new PerformanceData();
            data.setEmployeeId(request.getEmployeeId());
            data.setName(request.getName().trim());
            data.setDepartment(request.getDepartment() != null ? request.getDepartment() : "");
            data.setPosition(request.getPosition() != null ? request.getPosition() : "");
            data.setCurrentScore(valueOrZero(request.getCurrentScore()));
            data.setTasksCompleted(valueOrZero(request.getTasksCompleted()));
            data.setTotalTasks(valueOrZero(request.getTotalTasks()));
            data.setAttendance(valueOrZero(request.getAttendance()));
            data.setProductivity(valueOrZero(request.getProductivity()));
            data.setQualityScore(valueOrZero(request.getQualityScore()));
            data.setPunctuality(valueOrZero(request.getPunctuality()));
            data.setValidated(false);
            data.setMonthlyScores(
                    request.getMonthlyScores() != null ? request.getMonthlyScores() : new ArrayList<>()
            );
            data.setUser(user);

            PerformanceData saved = performanceRepository.save(data);
            System.out.println("Created performance record with ID: " + saved.getId() + " for user: " + user.getId());
            
            // Fetch with feedback
            return convertToResponse(
                performanceRepository.findByIdWithFeedback(saved.getId())
                    .orElse(saved)
            );
        } catch (Exception e) {
            System.err.println("Error creating performance: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /* ================= UPDATE ================= */

    @Transactional
    public PerformanceResponse updatePerformance(Long id, PerformanceRequest request) {
        try {
            PerformanceData data = performanceRepository.findByIdWithFeedback(id)
                    .orElseThrow(() -> new RuntimeException("Performance not found with ID: " + id));

            if (request.getName() != null && !request.getName().trim().isEmpty()) {
                data.setName(request.getName().trim());
            }
            if (request.getDepartment() != null) data.setDepartment(request.getDepartment());
            if (request.getPosition() != null) data.setPosition(request.getPosition());
            if (request.getCurrentScore() != null) data.setCurrentScore(request.getCurrentScore());
            if (request.getTasksCompleted() != null) data.setTasksCompleted(request.getTasksCompleted());
            if (request.getTotalTasks() != null) data.setTotalTasks(request.getTotalTasks());
            if (request.getAttendance() != null) data.setAttendance(request.getAttendance());
            if (request.getProductivity() != null) data.setProductivity(request.getProductivity());
            if (request.getQualityScore() != null) data.setQualityScore(request.getQualityScore());
            if (request.getPunctuality() != null) data.setPunctuality(request.getPunctuality());
            if (request.getMonthlyScores() != null) data.setMonthlyScores(request.getMonthlyScores());

            PerformanceData saved = performanceRepository.save(data);
            System.out.println("Updated performance record ID: " + saved.getId());
            
            return convertToResponse(saved);
        } catch (Exception e) {
            System.err.println("Error updating performance: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /* ================= ADMIN ACTIONS ================= */

    @Transactional
    public void setValidationStatus(Long id, Boolean validated) {
        try {
            PerformanceData data = performanceRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Performance not found with ID: " + id));
            data.setValidated(validated != null ? validated : false);
            performanceRepository.save(data);
            System.out.println("Updated validation status for ID: " + id + " to " + validated);
        } catch (Exception e) {
            System.err.println("Error setting validation status: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional
    public void deletePerformance(Long id) {
        try {
            if (!performanceRepository.existsById(id)) {
                throw new RuntimeException("Performance not found with ID: " + id);
            }
            performanceRepository.deleteById(id);
            System.out.println("Deleted performance record ID: " + id);
        } catch (Exception e) {
            System.err.println("Error deleting performance: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /* ================= SEARCH & FILTER ================= */

    @Transactional(readOnly = true)
    public List<PerformanceResponse> searchPerformance(String query) {
        try {
            return performanceRepository
                    .findByNameOrEmployeeIdWithFeedback(query, query)
                    .stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error searching performance: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to search performance data: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public List<PerformanceResponse> filterByDepartment(String department) {
        try {
            return performanceRepository.findByDepartmentWithFeedback(department)
                    .stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error filtering by department: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to filter performance data: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public List<PerformanceResponse> filterByStatus(String status) {
        try {
            return performanceRepository.findByStatusWithFeedback(status)
                    .stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error filtering by status: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to filter performance data: " + e.getMessage());
        }
    }

    /* ================= FEEDBACK ================= */

    @Transactional
    public void addFeedback(Long performanceId, String title, String comment, String author) {
        try {
            PerformanceData data = performanceRepository.findById(performanceId)
                    .orElseThrow(() -> new RuntimeException("Performance not found with ID: " + performanceId));

            if (title == null || title.trim().isEmpty()) {
                throw new RuntimeException("Feedback title is required");
            }
            if (comment == null || comment.trim().isEmpty()) {
                throw new RuntimeException("Feedback comment is required");
            }

            PerformanceFeedback feedback = new PerformanceFeedback();
            feedback.setTitle(title.trim());
            feedback.setComment(comment.trim());
            feedback.setAuthor(author != null ? author.trim() : "Anonymous");
            feedback.setPerformanceData(data);

            feedbackRepository.save(feedback);
            System.out.println("Added feedback to performance ID: " + performanceId);
        } catch (Exception e) {
            System.err.println("Error adding feedback: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /* ================= HELPERS ================= */

    private int valueOrZero(Integer value) {
        return value != null ? value : 0;
    }

    private PerformanceResponse convertToResponse(PerformanceData data) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");

            List<FeedbackResponse> feedbackList = new ArrayList<>();
            
            // Safely handle feedback collection
            try {
                if (data.getFeedback() != null && !data.getFeedback().isEmpty()) {
                    feedbackList = data.getFeedback().stream()
                            .map(f -> new FeedbackResponse(
                                    f.getId(),
                                    f.getTitle(),
                                    f.getComment(),
                                    f.getAuthor(),
                                    f.getDate() != null ? f.getDate().format(formatter) : ""
                            ))
                            .collect(Collectors.toList());
                }
            } catch (Exception e) {
                System.err.println("Warning: Could not load feedback for performance ID " + data.getId());
                feedbackList = new ArrayList<>();
            }

            return new PerformanceResponse(
                    data.getId(),
                    data.getEmployeeId(),
                    data.getName(),
                    data.getDepartment(),
                    data.getPosition(),
                    data.getCurrentScore(),
                    data.getStatus(),
                    data.getTasksCompleted(),
                    data.getTotalTasks(),
                    data.getAttendance(),
                    data.getProductivity(),
                    data.getQualityScore(),
                    data.getPunctuality(),
                    data.getValidated(),
                    data.getLastUpdated(),
                    data.getMonthlyScores(),
                    feedbackList
            );
        } catch (Exception e) {
            System.err.println("Error converting to response: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to convert performance data: " + e.getMessage());
        }
    }
}