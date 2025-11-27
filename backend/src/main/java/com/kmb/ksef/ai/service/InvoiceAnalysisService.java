package com.kmb.ksef.ai.service;

import com.kmb.ksef.ai.model.AnalysisStatus;
import com.kmb.ksef.ai.model.InvoiceAnalysis;
import com.kmb.ksef.ai.repository.InvoiceAnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
public class InvoiceAnalysisService {

    // POPRAWKA: Dodane 'final' - wymagane dla @RequiredArgsConstructor
    private final InvoiceAnalysisRepository invoiceAnalysisRepository;
    private final XsdValidatorService xsdValidator;

    public InvoiceAnalysis startAnalysis(MultipartFile file) throws IOException {
        String content = new String(file.getBytes(), StandardCharsets.UTF_8);
        String hash = calcHash(content);

        InvoiceAnalysis analysis = new InvoiceAnalysis();
        analysis.setFileName(file.getOriginalFilename());
        analysis.setRawContent(content);
        analysis.setFileHash(hash);

        // KROK: Walidacja Techniczna (XSD)
        try {
            xsdValidator.validate(content);
            // Jeśli przeszło (nie rzuciło wyjątku), ustawiamy na PENDING
            analysis.setStatus(AnalysisStatus.PENDING);
            analysis.setHasErrors(false);
        } catch (SAXException e) {
            // Jeśli XSD odrzuciło plik
            analysis.setStatus(AnalysisStatus.FAILED);
            analysis.setHasErrors(true);
            analysis.setAiAnalysisResult("{\"error\": \"Błąd struktury XML (KSeF): " + e.getMessage() + "\"}");
        }

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