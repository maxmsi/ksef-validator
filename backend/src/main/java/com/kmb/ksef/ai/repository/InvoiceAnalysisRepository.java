package com.kmb.ksef.ai.repository;

import com.kmb.ksef.ai.model.InvoiceAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceAnalysisRepository extends JpaRepository<InvoiceAnalysis, Long> {

    List<InvoiceAnalysis> findAllByOrderByCreatedAtDesc();
    InvoiceAnalysis findByFileHash(String fileHash);
}
