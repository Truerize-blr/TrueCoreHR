package com.hireconnect.dto.response;

public class AuthResponse {
	private String token;
    private Long userId;
    private String email;
    private String fullName;
    private String employeeId;
    private String role;
    private String onboardingStatus;

    public AuthResponse(
        String token,
        Long userId,
        String email,
        String fullName,
        String employeeId,
        String role,
        String onboardingStatus
    ) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.employeeId = employeeId;
        this.role = role;
        this.onboardingStatus = onboardingStatus;
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getOnboardingStatus() {
		return onboardingStatus;
	}

	public void setOnboardingStatus(String onboardingStatus) {
		this.onboardingStatus = onboardingStatus;
	}

}
