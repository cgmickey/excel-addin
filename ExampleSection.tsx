import React from 'react';
import { Stack, Text } from '@fluentui/react';
import { EXAMPLE_REQUESTS } from '../constants';
import { useExcelContext } from '../contexts/ExcelContext';

const ExampleSection: React.FC = () => {
  const { setUserInput } = useExcelContext();

  return (
    <Stack>
      <Text variant="mediumPlus">Example requests:</Text>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {EXAMPLE_REQUESTS.map((example, index) => (
          <li key={index}>
            <Text 
              variant="medium" 
              styles={{ root: { cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}}
              onClick={() => setUserInput(example)}
            >
              {example}
            </Text>
          </li>
        ))}
      </ul>
    </Stack>
  );
}

export default ExampleSection;