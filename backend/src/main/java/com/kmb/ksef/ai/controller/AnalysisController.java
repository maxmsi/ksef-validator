package com.kmb.ksef.ai.controller;

import com.kmb.ksef.ai.model.InvoiceAnalysis;
import com.kmb.ksef.ai.service.InvoiceAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class AnalysisController {

    private final InvoiceAnalysisService service;

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeInvoice(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Plik nie może być pusty");
        }

        try {
            InvoiceAnalysis savedAnalysis = service.startAnalysis(file);
            return ResponseEntity.ok(savedAnalysis);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Błąd IO: " + e.getMessage());
        }
    }
}