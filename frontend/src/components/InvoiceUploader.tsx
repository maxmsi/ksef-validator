import React, { useState } from 'react';

// Typy danych, które przychodzą z Twojej Javy
interface AnalysisResult {
    id: number;
    fileName: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    fileHash: string;
    hasErrors: boolean;
    aiAnalysisResult: string | null;
}

export const InvoiceUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setStatus('idle');
            setResult(null);
            setErrorMessage('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('uploading');
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Strzał do Twojego Backendu
            const response = await fetch('http://localhost:8080/api/invoices/analyze', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Błąd połączenia z serwerem');
            }

            const data: AnalysisResult = await response.json();
            setResult(data);
            setStatus('success');
        } catch (err: any) {
            console.error(err);
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    return (
        <div style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '10px', marginTop: '20px', backgroundColor: '#fff', color: '#333' }}>
            <h3>📤 Wrzuć fakturę do analizy (KSeF XML)</h3>
            
            <input 
                type="file" 
                accept=".xml"
                onChange={handleFileChange} 
                style={{ marginBottom: '10px' }}
            />

            <button 
                onClick={handleUpload} 
                disabled={!file || status === 'uploading'}
                style={{
                    padding: '10px 20px',
                    backgroundColor: status === 'uploading' ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: status === 'uploading' ? 'not-allowed' : 'pointer'
                }}
            >
                {status === 'uploading' ? 'Analizowanie...' : 'Wyślij do Walidacji'}
            </button>

            {/* ERROR */}
            {status === 'error' && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '5px' }}>
                    🚨 <strong>Błąd:</strong> {errorMessage}
                </div>
            )}

            {/* WYNIK */}
            {result && (
                <div style={{ marginTop: '20px', textAlign: 'left', padding: '15px', backgroundColor: result.hasErrors ? '#fff3e0' : '#e8f5e9', borderRadius: '5px' }}>
                    <h4>Wynik Walidacji:</h4>
                    <p><strong>Plik:</strong> {result.fileName}</p>
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Hash (SHA-256):</strong> <small>{result.fileHash}</small></p>
                    
                    {result.hasErrors ? (
                        <div style={{ color: '#d32f2f' }}>
                            ❌ <strong>Faktura ODRZUCONA przez XSD:</strong>
                            <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: '10px' }}>
                                {result.aiAnalysisResult}
                            </pre>
                        </div>
                    ) : (
                        <div style={{ color: '#2e7d32' }}>
                            ✅ <strong>Struktura XML Poprawna!</strong>
                            <p>Plik oczekuje na analizę AI (Logiczną).</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};