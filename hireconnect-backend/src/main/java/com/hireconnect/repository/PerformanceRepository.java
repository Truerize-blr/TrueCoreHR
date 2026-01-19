package com.hireconnect.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.hireconnect.entity.PerformanceData;

@Repository
public interface PerformanceRepository extends JpaRepository<PerformanceData, Long> {
    
    // Eagerly fetch feedback to avoid lazy initialization
    @Query("SELECT DISTINCT p FROM PerformanceData p LEFT JOIN FETCH p.feedback LEFT JOIN FETCH p.user")
    List<PerformanceData> findAllWithFeedback();
    
    @Query("SELECT p FROM PerformanceData p LEFT JOIN FETCH p.feedback LEFT JOIN FETCH p.user WHERE p.employeeId = :employeeId")
    Optional<PerformanceData> findByEmployeeIdWithFeedback(@Param("employeeId") String employeeId);
    
    @Query("SELECT p FROM PerformanceData p LEFT JOIN FETCH p.feedback LEFT JOIN FETCH p.user WHERE p.user.id = :userId")
    Optional<PerformanceData> findByUserIdWithFeedback(@Param("userId") Long userId);
    
    @Query("SELECT p FROM PerformanceData p LEFT JOIN FETCH p.feedback LEFT JOIN FETCH p.user WHERE p.id = :id")
    Optional<PerformanceData> findByIdWithFeedback(@Param("id") Long id);
    
    @Query("SELECT DISTINCT p FROM PerformanceData p LEFT JOIN FETCH p.feedback LEFT JOIN FETCH p.user WHERE p.department = :department")
    List<PerformanceData> findByDepartmentWithFeedback(@Param("department") String department);
    
    @Query("SELECT DISTINCT p FROM PerformanceData p LEFT JOIN FETCH p.feedback LEFT JOIN FETCH p.user WHERE p.status = :status")
    List<PerformanceData> findByStatusWithFeedback(@Param("status") String status);
    
    @Query("SELECT DISTINCT p FROM PerformanceData p LEFT JOIN FETCH p.feedback LEFT JOIN FETCH p.user WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) OR " +
           "LOWER(p.employeeId) LIKE LOWER(CONCAT('%', :employeeId, '%'))")
    List<PerformanceData> findByNameOrEmployeeIdWithFeedback(@Param("name") String name, @Param("employeeId") String employeeId);
    
    Optional<PerformanceData> findByEmployeeId(String employeeId);
    
    Optional<PerformanceData> findByUserId(Long userId);
    
    List<PerformanceData> findByDepartment(String department);
    
    List<PerformanceData> findByStatus(String status);
    
    List<PerformanceData> findByValidated(Boolean validated);
    
    List<PerformanceData> findByNameContainingIgnoreCaseOrEmployeeIdContainingIgnoreCase(
            String name, 
            String employeeId
    );
    
    Boolean existsByEmployeeId(String employeeId);
    
    // Additional method to check if user has performance record
    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM PerformanceData p WHERE p.user.id = :userId")
    boolean existsByUserId(@Param("userId") Long userId);
}