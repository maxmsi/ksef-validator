import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Loader2, X } from 'lucide-react';

interface AnalysisResult {
    id: number;
    fileName: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    fileHash: string;
    hasErrors: boolean;
    aiAnalysisResult: string | null;
}

export const KsefUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            selectFile(e.target.files[0]);
        }
    };

    const selectFile = (selectedFile: File) => {
        setFile(selectedFile);
        setStatus('idle');
        setResult(null);
        setErrorMessage('');
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            selectFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('uploading');
        const formData = new FormData();
        formData.append('file', file);

        try {
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
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mt-10">
            
            {/* Header Sekcji */}
            <div className="text-center mb-8">
                <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UploadCloud size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Prześlij fakturę KSeF</h3>
                <p className="text-slate-500 mt-2">Obsługujemy formaty XML zgodne ze schemą FA(2)</p>
            </div>

            {/* Dropzone */}
            <div 
                className={`
                    relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer
                    ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
                    ${status === 'uploading' ? 'opacity-50 pointer-events-none' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input 
                    type="file" 
                    accept=".xml" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    ref={fileInputRef}
                />
                
                {file ? (
                    <div className="flex items-center justify-center gap-3 text-blue-700 bg-blue-50 p-4 rounded-lg">
                        <FileText size={24} />
                        <span className="font-medium">{file.name}</span>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="p-1 hover:bg-blue-200 rounded-full transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="text-slate-600 font-medium text-lg">Kliknij, aby wybrać plik</p>
                        <p className="text-slate-400 text-sm mt-1">lub przeciągnij go tutaj</p>
                    </>
                )}
            </div>

            {/* Przycisk Akcji */}
            <div className="mt-6">
                <button 
                    onClick={handleUpload} 
                    disabled={!file || status === 'uploading'}
                    className={`
                        w-full py-4 px-6 rounded-xl font-bold text-white transition-all shadow-md text-lg
                        flex items-center justify-center gap-2
                        ${!file || status === 'uploading' 
                            ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:transform active:scale-[0.98]'}
                    `}
                >
                    {status === 'uploading' ? (
                        <><Loader2 className="animate-spin" /> Analizowanie...</>
                    ) : (
                        'Rozpocznij Walidację'
                    )}
                </button>
            </div>

            {/* Komunikaty Błędów */}
            {status === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
                    <AlertTriangle className="shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold">Wystąpił błąd</p>
                        <p className="text-sm mt-1">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* Wynik Analizy */}
            {result && (
                <div className={`mt-8 border rounded-xl overflow-hidden animate-in zoom-in-95 duration-300 ${result.hasErrors ? 'border-red-200 shadow-red-100' : 'border-green-200 shadow-green-100'} shadow-lg`}>
                    <div className={`p-4 ${result.hasErrors ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'} flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                            {result.hasErrors ? <AlertTriangle /> : <CheckCircle />}
                            <span className="font-bold text-lg">
                                {result.hasErrors ? 'Wykryto Błędy' : 'Faktura Poprawna'}
                            </span>
                        </div>
                        <span className="text-xs font-mono opacity-70 px-2 py-1 bg-white/50 rounded">
                            {result.status}
                        </span>
                    </div>
                    
                    <div className="p-6 bg-white space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Nazwa Pliku</span>
                                <span className="text-slate-700 font-medium">{result.fileName}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Hash Pliku</span>
                                <span className="text-slate-700 font-mono text-xs break-all">{result.fileHash}</span>
                            </div>
                        </div>

                        {result.hasErrors && (
                            <div className="mt-4">
                                <span className="text-slate-400 block text-xs uppercase tracking-wider mb-2">Szczegóły błędu</span>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 font-mono text-sm text-red-600 overflow-x-auto">
                                    {result.aiAnalysisResult}
                                </div>
                            </div>
                        )}
                        
                        {!result.hasErrors && (
                            <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm flex gap-2">
                                <Loader2 size={16} className="animate-spin mt-0.5" />
                                <span>Plik przeszedł walidację techniczną XSD. Oczekiwanie na analizę inteligentną (AI)...</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default KsefUploader;