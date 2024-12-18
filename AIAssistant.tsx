import React from 'react';
import { Stack, Text } from '@fluentui/react';
import InputSection from './InputSection';
import ResultSection from './ResultSection';
import ExampleSection from './ExampleSection';

const AIAssistant: React.FC = () => {
  return (
    <Stack tokens={{ childrenGap: 15, padding: 10 }}>
      <Text variant="xLarge">Excel AI Assistant</Text>
      <ResultSection />
      <InputSection />
      <ExampleSection />
    </Stack>
  );
};

export default AIAssistant;