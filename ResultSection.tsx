import React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { useExcelContext } from '../contexts/ExcelContext';

const ResultSection: React.FC = () => {
  const { error, result } = useExcelContext();

  return (
    <>
      {error && (
        <MessageBar messageBarType={MessageBarType.error}>
          {error}
        </MessageBar>
      )}
      
      {result && (
        <MessageBar messageBarType={MessageBarType.success}>
          {result}
        </MessageBar>
      )}
    </>
  );
}

export default ResultSection;