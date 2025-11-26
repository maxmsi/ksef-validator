package com.kmb.ksef.ai.service;

import com.kmb.ksef.ai.model.AnalysisStatus;
import com.kmb.ksef.ai.model.InvoiceAnalysis;
import com.kmb.ksef.ai.repository.InvoiceAnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
public class InvoiceAnalysisService {

    InvoiceAnalysisRepository  invoiceAnalysisRepository;

    public InvoiceAnalysis startAnalysis(MultipartFile file) throws IOException {
        String content = new String(file.getBytes(), StandardCharsets.UTF_8);
        String hash = calcHash(content);

//        invoiceAnalysisRepository.findByFileHash(hash).ifPresent(existingAnalysis -> {
//            throw new IllegalArgumentException("Analiza dla tego pliku już istnieje.");
//        });

        InvoiceAnalysis analysis = new InvoiceAnalysis();
        analysis.setFileName(file.getOriginalFilename());
        analysis.setRawContent(content);
        analysis.setFileHash(hash);
        analysis.setStatus(AnalysisStatus.PENDING);

        return invoiceAnalysisRepository.save(analysis);

    }

    private String calcHash(String content) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(content.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Błąd algorytmu hashującego", e);
        }
    }
}
