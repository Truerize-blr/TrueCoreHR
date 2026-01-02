package com.hireconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hireconnect.entity.Ticket;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
    List<Ticket> findByEmployeeIdOrderByCreatedAtDesc(Long employeeId);
    
    List<Ticket> findAllByOrderByCreatedAtDesc();
    
    List<Ticket> findByStatus(Ticket.TicketStatus status);
    
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.status = :status")
    long countByStatus(@Param("status") Ticket.TicketStatus status);
}