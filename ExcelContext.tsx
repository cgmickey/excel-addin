import React, { createContext, useContext, useState } from 'react';

interface ExcelContextType {
  error: string;
  setError: (error: string) => void;
  result: string;
  setResult: (result: string) => void;
  userInput: string;
  setUserInput: (input: string) => void;
}

const ExcelContext = createContext<ExcelContextType | undefined>(undefined);

export const ExcelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [userInput, setUserInput] = useState('');

  return (
    <ExcelContext.Provider value={{
      error,
      setError,
      result,
      setResult,
      userInput,
      setUserInput
    }}>
      {children}
    </ExcelContext.Provider>
  );
};

export const useExcelContext = () => {
  const context = useContext(ExcelContext);
  if (undefined === context) {
    throw new Error('useExcelContext must be used within an ExcelProvider');
  }
  return context;
};