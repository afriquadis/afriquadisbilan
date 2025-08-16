import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SymptomSelector } from './components/SymptomSelector';
import { DiagnosticResult } from './components/DiagnosticResult';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { getDiagnostic } from './services/diagnosticService';
import type { DiagnosticReport } from './types';

function App(): React.ReactNode {
  const [view, setView] = useState<'selector' | 'analyzing' | 'result'>('selector');
  const [report, setReport] = useState<DiagnosticReport | null>(null);

  const handleDiagnose = useCallback((selectedSymptomIds: string[]) => {
    setView('analyzing');
    // Simulate AI analysis delay
    setTimeout(() => {
      const diagnosticReport = getDiagnostic(selectedSymptomIds);
      setReport(diagnosticReport);
      setView('result');
    }, 2500);
  }, []);

  const handleReset = useCallback(() => {
    setReport(null);
    setView('selector');
  }, []);
  
  const renderContent = () => {
    switch (view) {
      case 'selector':
        return <SymptomSelector onDiagnose={handleDiagnose} />;
      case 'analyzing':
        return <AnalyzingScreen />;
      case 'result':
        return report && <DiagnosticResult report={report} onReset={handleReset} />;
      default:
        return <SymptomSelector onDiagnose={handleDiagnose} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-gray-50 to-orange-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 w-full max-w-5xl">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;