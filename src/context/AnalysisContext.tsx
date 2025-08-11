import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Feedback } from '@/types';

interface AnalysisData {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  fileName: string;
  analysis: Feedback;
  pdfData: string;
  timestamp: string;
}

interface AnalysisContextType {
  analysisData: AnalysisData | null;
  setAnalysisData: (data: AnalysisData | null) => void;
  clearAnalysis: () => void;
  isAnalysisAvailable: boolean;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const clearAnalysis = () => {
    setAnalysisData(null);
  };

  const isAnalysisAvailable = analysisData !== null;

  const value: AnalysisContextType = {
    analysisData,
    setAnalysisData,
    clearAnalysis,
    isAnalysisAvailable
  };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = (): AnalysisContextType => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};