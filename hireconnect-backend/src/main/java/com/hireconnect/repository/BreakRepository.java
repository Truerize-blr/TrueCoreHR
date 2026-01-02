package com.hireconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hireconnect.entity.Break;

import java.util.List;
import java.util.Optional;

@Repository
public interface BreakRepository extends JpaRepository<Break, Long> {
    
    List<Break> findBySessionId(Long sessionId);
    
    @Query("SELECT b FROM Break b WHERE b.sessionId = :sessionId AND b.breakEnd IS NULL ORDER BY b.breakStart DESC")
    Optional<Break> findActiveBreakBySessionId(@Param("sessionId") Long sessionId);
    
    @Query("SELECT COUNT(b) FROM Break b WHERE b.breakEnd IS NULL")
    long countActiveBreaks();
}