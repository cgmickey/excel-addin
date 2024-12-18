export interface AIResponse {
  type: 'formula' | 'operation';
  formula?: string;
  execute?: (context: Excel.RequestContext) => Promise<void>;
}