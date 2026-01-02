package com.hireconnect.service;

import com.hireconnect.entity.User;
import com.hireconnect.repository.*;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {
    
    private  UserRepository userRepository;
    private  AttendanceSessionRepository attendanceSessionRepository;
    private  LeaveRepository leaveRepository;
//    private final DocumentRepository documentRepository;
    @Autowired
    public DashboardService(UserRepository userRepository, AttendanceSessionRepository attendanceSessionRepository,
		LeaveRepository leaveRepository) {
	super();
	this.userRepository = userRepository;
	this.attendanceSessionRepository = attendanceSessionRepository;
	this.leaveRepository = leaveRepository;
}
    
    public Map<String, Object> getEmployeeDashboard(Long employeeId) {
        User employee = userRepository.findById(employeeId)
            .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("employee", employee);
//        dashboard.put("totalDocuments", documentRepository.findByUserId(employeeId).size());
        dashboard.put("pendingLeaves", leaveRepository.findByUserId(employeeId).size());
        
        return dashboard;
    }
    


	public Map<String, Object> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalEmployees", userRepository.countByRole(User.Role.EMPLOYEE));
        dashboard.put("totalAdmins", userRepository.countByRole(User.Role.ADMIN));
        dashboard.put("presentToday", attendanceSessionRepository.countPresentToday());
        
        return dashboard;
    }
    
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalEmployees", userRepository.countByRole(User.Role.EMPLOYEE));
        
        return stats;
    }
}