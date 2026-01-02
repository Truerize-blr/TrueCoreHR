package com.hireconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hireconnect.entity.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    
    Optional<User> findByEmail(String email);
    List<User> findAllById(Iterable<Long> ids);
    
    Optional<User> findByEmailAndDeletedAtIsNull(String email);
    
    Optional<User> findByIdAndDeletedAtIsNull(Long id);
    
    
    List<User> findByRole(User.Role role);
    
    List<User> findByRoleAndDeletedAtIsNull(User.Role role);
    
    List<User> findByRoleAndStatus(User.Role role, User.Status status);
    
    List<User> findByRoleAndStatusAndDeletedAtIsNull(User.Role role, User.Status status);
    
    
    List<User> findByStatus(User.Status status);
    
    List<User> findByStatusAndDeletedAtIsNull(User.Status status);
    
    
    List<User> findByApproved(Boolean approved);
    
    List<User> findByApprovedAndDeletedAtIsNull(Boolean approved);
    
    List<User> findByApprovedAndRole(Boolean approved, User.Role role);
    
    
    List<User> findByOnboardingStatus(User.OnboardingStatus status);
    
    List<User> findByOnboardingStatusAndRole(User.OnboardingStatus status, User.Role role);
    
    
    List<User> findByDepartment(String department);
    
    List<User> findByDepartmentAndDeletedAtIsNull(String department);
    
    
    List<User> findByIsAdmin(Boolean isAdmin);
    
    List<User> findByIsAdminAndDeletedAtIsNull(Boolean isAdmin);
    
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") User.Role role);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role AND u.status = :status")
    long countByRoleAndStatus(@Param("role") User.Role role, @Param("status") User.Status status);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role AND u.deletedAt IS NULL")
    long countActiveByRole(@Param("role") User.Role role);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.approved = :approved AND u.role = :role")
    long countByApprovedAndRole(@Param("approved") Boolean approved, @Param("role") User.Role role);
    
    
    boolean existsByEmail(String email);
    
    boolean existsByEmailAndIdNot(String email, Long id);
    
    
    @Query("SELECT u FROM User u WHERE u.deletedAt IS NULL AND " +
           "(LOWER(u.fullName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(u.mobile) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<User> searchUsers(@Param("query") String query);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.deletedAt IS NULL AND " +
           "(LOWER(u.fullName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<User> searchUsersByRole(@Param("role") User.Role role, @Param("query") String query);
    
   
    @Query("SELECT u FROM User u WHERE u.lastLoginAt >= :since AND u.deletedAt IS NULL ORDER BY u.lastLoginAt DESC")
    List<User> findRecentlyLoggedIn(@Param("since") LocalDateTime since);
    
    
    Optional<User> findByVerificationToken(String token);
    
    Optional<User> findByResetPasswordToken(String token);
    
    Optional<User> findByResetPasswordTokenAndResetPasswordExpireAfter(String token, LocalDateTime now);
    
    
    @Query("SELECT u FROM User u WHERE u.deletedAt IS NULL ORDER BY u.createdAt DESC")
    List<User> findAllActive();
    
    @Query("SELECT u FROM User u WHERE u.deletedAt IS NOT NULL ORDER BY u.deletedAt DESC")
    List<User> findAllDeleted();
    
    @Query("SELECT u FROM User u WHERE u.role = :role OR u.isAdmin = true")
    List<User> findAllAdmins(@Param("role") User.Role role);
}