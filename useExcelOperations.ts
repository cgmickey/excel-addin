import { useState } from 'react';
import { useExcelContext } from '../contexts/ExcelContext';
import { processUserRequest } from '../services/aiService';

export const useExcelOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setError, setResult } = useExcelContext();

  const processRequest = async (userInput: string) => {
    setIsLoading(true);
    setError('');
    setResult('');

    try {
      await Excel.run(async (context) => {
        const response = await processUserRequest(userInput);
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        
        if (response.type === 'formula') {
          const range = sheet.getSelectedRange();
          range.formulas = [[response.formula]];
          setResult('Formula applied successfully!');
        } else if (response.type === 'operation') {
          await response.execute(context);
          setResult('Operation completed successfully!');
        }

        await context.sync();
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { processRequest, isLoading };
};