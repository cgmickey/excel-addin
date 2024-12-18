import React, { useState } from 'react';
import { TextField, PrimaryButton, Stack, Spinner, SpinnerSize } from '@fluentui/react';
import { useExcelOperations } from '../hooks/useExcelOperations';

const InputSection: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const { processRequest, isLoading } = useExcelOperations();

  const handleSubmit = async () => {
    if (userInput.trim()) {
      await processRequest(userInput);
    }
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <TextField
        label="What would you like to do?"
        multiline
        rows={3}
        value={userInput}
        onChange={(_, newValue) => setUserInput(newValue || '')}
        placeholder="E.g., 'Calculate the sum of sales' or 'Sort data by date'"
        disabled={isLoading}
      />
      
      <PrimaryButton 
        text={isLoading ? "Processing..." : "Process"} 
        onClick={handleSubmit}
        disabled={isLoading || !userInput.trim()}
        iconProps={isLoading ? { iconName: 'Sync' } : { iconName: 'Send' }}
      />

      {isLoading && (
        <Stack horizontal horizontalAlign="center">
          <Spinner size={SpinnerSize.large} label="Processing your request..." />
        </Stack>
      )}
    </Stack>
  );
}

export default InputSection;