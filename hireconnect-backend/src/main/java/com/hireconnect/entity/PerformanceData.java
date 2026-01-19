package com.hireconnect.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "performance_data")
public class PerformanceData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String employeeId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false)
    private Integer currentScore = 0;

    @Column(nullable = false)
    private String status = "Average";

    @Column(nullable = false)
    private Integer tasksCompleted = 0;

    @Column(nullable = false)
    private Integer totalTasks = 0;

    @Column(nullable = false)
    private Integer attendance = 0;

    @Column(nullable = false)
    private Integer productivity = 0;

    @Column(nullable = false)
    private Integer qualityScore = 0;

    @Column(nullable = false)
    private Integer punctuality = 0;

    @Column(nullable = false)
    private Boolean validated = false;

    @Column(nullable = false)
    private LocalDateTime lastUpdated = LocalDateTime.now();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "monthly_scores",
        joinColumns = @JoinColumn(name = "performance_id")
    )
    @Column(name = "score")
    private List<Integer> monthlyScores = new ArrayList<>();

    @OneToMany(
        mappedBy = "performanceData",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY  // Keep lazy to avoid N+1 issues
    )
    private List<PerformanceFeedback> feedback = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /* ===================== JPA CALLBACKS ===================== */

    @PrePersist
    @PreUpdate
    public void preSave() {
        this.lastUpdated = LocalDateTime.now();
        updateStatus();
    }

    private void updateStatus() {
        if (currentScore >= 90) {
            this.status = "Excellent";
        } else if (currentScore >= 75) {
            this.status = "Good";
        } else if (currentScore >= 60) {
            this.status = "Average";
        } else {
            this.status = "Needs Improvement";
        }
    }

    /* ===================== MANUAL BUILDER ===================== */

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final PerformanceData data = new PerformanceData();

        public Builder employeeId(String employeeId) {
            data.employeeId = employeeId;
            return this;
        }

        public Builder name(String name) {
            data.name = name;
            return this;
        }

        public Builder department(String department) {
            data.department = department;
            return this;
        }

        public Builder position(String position) {
            data.position = position;
            return this;
        }

        public Builder currentScore(Integer currentScore) {
            data.currentScore = currentScore;
            return this;
        }

        public Builder tasksCompleted(Integer tasksCompleted) {
            data.tasksCompleted = tasksCompleted;
            return this;
        }

        public Builder totalTasks(Integer totalTasks) {
            data.totalTasks = totalTasks;
            return this;
        }

        public Builder attendance(Integer attendance) {
            data.attendance = attendance;
            return this;
        }

        public Builder productivity(Integer productivity) {
            data.productivity = productivity;
            return this;
        }

        public Builder qualityScore(Integer qualityScore) {
            data.qualityScore = qualityScore;
            return this;
        }

        public Builder punctuality(Integer punctuality) {
            data.punctuality = punctuality;
            return this;
        }

        public Builder validated(Boolean validated) {
            data.validated = validated;
            return this;
        }

        public Builder monthlyScores(List<Integer> monthlyScores) {
            data.monthlyScores = monthlyScores != null ? monthlyScores : new ArrayList<>();
            return this;
        }

        public Builder user(User user) {
            data.user = user;
            return this;
        }

        public PerformanceData build() {
            return data;
        }
    }

    /* ===================== GETTERS & SETTERS ===================== */

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public Integer getCurrentScore() { return currentScore; }
    public void setCurrentScore(Integer currentScore) { 
        this.currentScore = currentScore; 
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getTasksCompleted() { return tasksCompleted; }
    public void setTasksCompleted(Integer tasksCompleted) { this.tasksCompleted = tasksCompleted; }

    public Integer getTotalTasks() { return totalTasks; }
    public void setTotalTasks(Integer totalTasks) { this.totalTasks = totalTasks; }

    public Integer getAttendance() { return attendance; }
    public void setAttendance(Integer attendance) { this.attendance = attendance; }

    public Integer getProductivity() { return productivity; }
    public void setProductivity(Integer productivity) { this.productivity = productivity; }

    public Integer getQualityScore() { return qualityScore; }
    public void setQualityScore(Integer qualityScore) { this.qualityScore = qualityScore; }

    public Integer getPunctuality() { return punctuality; }
    public void setPunctuality(Integer punctuality) { this.punctuality = punctuality; }

    public Boolean getValidated() { return validated; }
    public void setValidated(Boolean validated) { this.validated = validated; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    public List<Integer> getMonthlyScores() { 
        return monthlyScores != null ? monthlyScores : new ArrayList<>(); 
    }
    public void setMonthlyScores(List<Integer> monthlyScores) { 
        this.monthlyScores = monthlyScores != null ? monthlyScores : new ArrayList<>(); 
    }

    public List<PerformanceFeedback> getFeedback() { 
        return feedback != null ? feedback : new ArrayList<>(); 
    }
    public void setFeedback(List<PerformanceFeedback> feedback) { 
        this.feedback = feedback != null ? feedback : new ArrayList<>(); 
    }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
