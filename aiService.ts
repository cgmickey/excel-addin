import { HfInference } from '@huggingface/inference';
import { AIResponse } from '../types';
import { handleSortOperation, handleFilterOperation } from './excelOperations';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function processUserRequest(userInput: string): Promise<AIResponse> {
  try {
    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.1',
      inputs: `Convert this Excel request to a formula or operation. If it's a formula, start with '='. If it's an operation, describe the steps.
Request: ${userInput}
Response:`,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.3,
        top_p: 0.9,
      }
    });

    const aiResponse = response.generated_text.trim();
    
    if (aiResponse.startsWith('=')) {
      return {
        type: 'formula',
        formula: aiResponse
      };
    } else {
      return {
        type: 'operation',
        execute: async (context) => {
          const sheet = context.workbook.worksheets.getActiveWorksheet();
          const range = sheet.getUsedRange();
          
          if (aiResponse.toLowerCase().includes('sort')) {
            await handleSortOperation(context, range, aiResponse);
          }

          if (aiResponse.toLowerCase().includes('filter')) {
            await handleFilterOperation(context, range, aiResponse);
          }
        }
      };
    }
  } catch (error) {
    throw new Error('Failed to process request: ' + (error as Error).message);
  }
}