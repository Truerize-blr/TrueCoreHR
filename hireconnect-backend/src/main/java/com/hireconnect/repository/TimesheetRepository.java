package com.hireconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hireconnect.entity.Timesheet;

@Repository
public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {
    
//    List<Timesheet> findByEmployeeIdOrderByCreatedAtDesc(Long employeeId);
//    
//    List<Timesheet> findTop500ByOrderByCreatedAtDesc();
    List<Timesheet> findByEmployeeIdOrderByCreatedAtDesc(Long employeeId);
    
    List<Timesheet> findTop500ByOrderByCreatedAtDesc();
    
    Optional<Timesheet> findBySessionId(Long sessionId);
}