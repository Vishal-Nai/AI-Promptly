export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  template: string;
  category: string;
  tags: string[];
  modelConfig: ModelConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModelConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface Variable {
  name: string;
  description: string;
  defaultValue?: string;
}
