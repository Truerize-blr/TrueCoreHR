package com.hireconnect.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hireconnect.dto.request.ApplyLeaveRequest;
import com.hireconnect.dto.request.AttendanceRequest;
import com.hireconnect.dto.request.BulkActionRequest;
import com.hireconnect.dto.request.ManualAttendanceRequest;
import com.hireconnect.dto.response.ApiResponse;
import com.hireconnect.dto.response.DashboardStatsResponse;
import com.hireconnect.service.AdminAttendanceService;

@RestController
@RequestMapping("/api/admin/attendance")
@CrossOrigin(origins = "*")
public class AdminAttendanceController {
    
	@Autowired
    private AdminAttendanceService adminAttendanceService;

    
    @GetMapping("/live")
    public ResponseEntity<ApiResponse<?>> getLiveAttendance() {
        try {
            var liveData = adminAttendanceService.getLiveAttendance();
            return ResponseEntity.ok(ApiResponse.success("Live attendance fetched", liveData));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/reports")
    public ResponseEntity<ApiResponse<?>> getReports(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year) {
        try {
            var reports = adminAttendanceService.getReports(month, year);
            return ResponseEntity.ok(ApiResponse.success("Reports fetched", reports));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/admins")
    public ResponseEntity<ApiResponse<?>> getAllAdmins() {
        try {
            var admins = adminAttendanceService.getAllAdmins();
            return ResponseEntity.ok(ApiResponse.success("Admins fetched successfully", admins));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
 // ✅ ADD THESE ENDPOINTS to your AdminAttendanceController

    @DeleteMapping("/admins/{id}")
    public ResponseEntity<ApiResponse<String>> deleteAdmin(@PathVariable Long id) {
        try {
            adminAttendanceService.deleteAdmin(id);
            return ResponseEntity.ok(ApiResponse.success("Admin deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/admins/{id}")
    public ResponseEntity<ApiResponse<String>> updateAdmin(
            @PathVariable Long id, 
            @RequestBody Map<String, Object> updateData) {
        try {
            String fullName = (String) updateData.get("fullName");
            String email = (String) updateData.get("email");
            String phone = (String) updateData.get("phone");
            String department = (String) updateData.get("department");
            String position = (String) updateData.get("position");
            Boolean isAdmin = (Boolean) updateData.get("isAdmin");
            
            adminAttendanceService.updateAdmin(id, fullName, email, phone, department, position, isAdmin);
            return ResponseEntity.ok(ApiResponse.success("Admin updated successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/admins/{id}")
    public ResponseEntity<ApiResponse<?>> getAdminById(@PathVariable Long id) {
        try {
            var admin = adminAttendanceService.getAdminById(id);
            return ResponseEntity.ok(ApiResponse.success("Admin fetched successfully", admin));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    
    @GetMapping("/timesheets")
    public ResponseEntity<ApiResponse<?>> getTimesheets() {
        try {
            var timesheets = adminAttendanceService.getTimesheets();
            return ResponseEntity.ok(ApiResponse.success("Timesheets fetched", timesheets));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping("/apply-leave/{id}")
    public ResponseEntity<ApiResponse<String>> applyLeave(
            @PathVariable Long id,
            @RequestBody ApplyLeaveRequest request) {
        try {
            adminAttendanceService.applyLeave(id, request.getStartDate(), 
                request.getEndDate(), request.getLeaveType(), request.getReason());
            return ResponseEntity.ok(ApiResponse.success("Leave applied for employee", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping("/apply-leave-all")
    public ResponseEntity<ApiResponse<String>> applyLeaveAll(@RequestBody ApplyLeaveRequest request) {
        try {
            adminAttendanceService.applyLeaveAll(request.getStartDate(), 
                request.getEndDate(), request.getLeaveType(), request.getReason());
            return ResponseEntity.ok(ApiResponse.success("Leave applied for all employees", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/pending-requests")
    public ResponseEntity<ApiResponse<?>> getPendingRequests() {
        try {
            var requests = adminAttendanceService.getPendingRequests();
            return ResponseEntity.ok(ApiResponse.success("Pending requests fetched", requests));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/approve-request/{id}")
    public ResponseEntity<ApiResponse<String>> approveRequest(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        try {
            String type = body.get("type");
            adminAttendanceService.approveRequest(id, type);
            return ResponseEntity.ok(ApiResponse.success("Request approved", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/reject-request/{id}")
    public ResponseEntity<ApiResponse<String>> rejectRequest(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        try {
            String type = body.get("type");
            String reason = body.get("reason");
            adminAttendanceService.rejectRequest(id, type, reason);
            return ResponseEntity.ok(ApiResponse.success("Request rejected", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/dashboard-stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getDashboardStats() {
        try {
            DashboardStatsResponse stats = adminAttendanceService.getDashboardStats();
            return ResponseEntity.ok(ApiResponse.success("Dashboard stats fetched", stats));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping("/force-punch")
    public ResponseEntity<ApiResponse<String>> forcePunch(@RequestBody AttendanceRequest request) {
        try {
            if ("punch_in".equals(request.getAction())) {
                adminAttendanceService.forcePunchIn(request.getEmployeeId(), request.getTimestamp());
            } else if ("punch_out".equals(request.getAction())) {
                adminAttendanceService.forcePunchOut(request.getEmployeeId(), request.getTimestamp());
            } else {
                return ResponseEntity.badRequest().body(ApiResponse.error("Invalid action"));
            }
            return ResponseEntity.ok(ApiResponse.success("Force punch successful", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/records")
    public ResponseEntity<ApiResponse<?>> getRecords(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        try {
            var records = adminAttendanceService.getRecords(userId, date, status, startDate, endDate);
            return ResponseEntity.ok(ApiResponse.success("Records fetched", records));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/calendar")
    public ResponseEntity<ApiResponse<?>> getCalendar(
            @RequestParam Long userId,
            @RequestParam Integer year,
            @RequestParam Integer month) {
        try {
            var calendar = adminAttendanceService.getCalendar(userId, year, month);
            return ResponseEntity.ok(ApiResponse.success("Calendar data fetched", calendar));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<?>> getAttendanceAnalytics() {
        try {
            var analytics = adminAttendanceService.getAttendanceAnalytics();
            return ResponseEntity.ok(ApiResponse.success("Analytics fetched", analytics));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<?>> getUsers() {
        try {
            var users = adminAttendanceService.getUsers();
            return ResponseEntity.ok(ApiResponse.success("Users fetched", users));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping("/bulk-action")
    public ResponseEntity<ApiResponse<String>> applyBulkAction(@RequestBody BulkActionRequest request) {
        try {
            adminAttendanceService.applyBulkActionForUser(request);
            return ResponseEntity.ok(ApiResponse.success("Bulk action applied successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    

    @PostMapping("/apply-manual-attendance/{employeeId}")
    public ResponseEntity<ApiResponse<String>> applyManualAttendance(
            @PathVariable Long employeeId,
            @RequestBody ManualAttendanceRequest request) {
        try {
            adminAttendanceService.applyManualAttendance(employeeId, request);
            return ResponseEntity.ok(ApiResponse.success("Manual attendance applied successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    

    @PutMapping("/update-manual-attendance/{employeeId}")
    public ResponseEntity<ApiResponse<String>> updateManualAttendance(
            @PathVariable Long employeeId,
            @RequestBody ManualAttendanceRequest request) {
        try {
            adminAttendanceService.updateManualAttendance(employeeId, request);
            return ResponseEntity.ok(ApiResponse.success("Attendance updated successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllTimesheets() {
        try {
            var timesheets = adminAttendanceService.getAllTimesheets();
            return ResponseEntity.ok(ApiResponse.success("Timesheets fetched successfully", timesheets));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // GET timesheet by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getTimesheetById(@PathVariable Long id) {
        try {
            var timesheet = adminAttendanceService.getTimesheetById(id);
            return ResponseEntity.ok(ApiResponse.success("Timesheet fetched successfully", timesheet));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // UPDATE timesheet
    @PutMapping("timesheets/{id}")
    public ResponseEntity<ApiResponse<?>> updateTimesheet(
            @PathVariable Long id,
            @RequestBody Map<String, String> updates) {
        try {
            String task = updates.get("task");
            String remarks = updates.get("remarks");
            var updated = adminAttendanceService.updateTimesheet(id, task, remarks);
            return ResponseEntity.ok(ApiResponse.success("Timesheet updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // DELETE timesheet
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteTimesheet(@PathVariable Long id) {
        try {
        	adminAttendanceService.deleteTimesheet(id);
            return ResponseEntity.ok(ApiResponse.success("Timesheet deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    // GET timesheets by employee ID
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<ApiResponse<?>> getTimesheetsByEmployee(@PathVariable Long employeeId) {
        try {
            var timesheets = adminAttendanceService.getTimesheetsByEmployee(employeeId);
            return ResponseEntity.ok(ApiResponse.success("Employee timesheets fetched successfully", timesheets));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

}