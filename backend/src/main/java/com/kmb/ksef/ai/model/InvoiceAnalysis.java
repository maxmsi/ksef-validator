package com.kmb.ksef.ai.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "invoice_analysis")
@Data
@NoArgsConstructor
public class InvoiceAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;

    @Enumerated(EnumType.STRING)
    private AnalysisStatus status;

    @Column(columnDefinition = "TEXT")
    private String rawContent;

    @Column(columnDefinition = "TEXT")
    private String aiAnalysisResult;

    private boolean hasErrors;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String fileHash;

}
