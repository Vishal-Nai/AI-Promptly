import type { PromptTemplate, ModelConfig } from "../types";

const defaultModelConfig: ModelConfig = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1000,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

let templates: PromptTemplate[] = [
  {
    id: "1",
    title: "Content Writer Assistant",
    description:
      "A template for generating blog post outlines and content ideas",
    template:
      "Create a detailed outline for a blog post about {{topic}} including {{sections}} sections.",
    category: "Content Writing",
    tags: ["blog", "content", "writing"],
    modelConfig: { ...defaultModelConfig },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Code Review Helper",
    description:
      "Assists in reviewing code and providing improvement suggestions",
    template:
      "Review this {{language}} code and provide suggestions for improvement: {{code}}",
    category: "Development",
    tags: ["code", "review", "development"],
    modelConfig: { ...defaultModelConfig },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const templateService = {
  getTemplates: () => templates,

  getTemplateById: (id: string) => templates.find((t) => t.id === id),

  createTemplate: (
    template: Omit<PromptTemplate, "id" | "createdAt" | "updatedAt">
  ) => {
    const newTemplate: PromptTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    templates = [...templates, newTemplate];
    return newTemplate;
  },

  updateTemplate: (id: string, template: Partial<PromptTemplate>) => {
    templates = templates.map((t) =>
      t.id === id ? { ...t, ...template, updatedAt: new Date() } : t
    );
    return templates.find((t) => t.id === id);
  },

  deleteTemplate: (id: string) => {
    templates = templates.filter((t) => t.id !== id);
  },

  getCategories: () => [...new Set(templates.map((t) => t.category))],

  getTags: () => [...new Set(templates.flatMap((t) => t.tags))],

  searchTemplates: (query: string, category?: string) => {
    return templates.filter((t) => {
      const matchesQuery = query
        ? t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesCategory =
        category && category !== "All Categories"
          ? t.category === category
          : true;

      return matchesQuery && matchesCategory;
    });
  },
};
