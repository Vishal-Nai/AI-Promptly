import React from 'react';
import { TemplateCard } from '../components/TemplateCard';
import { PromptTemplate } from '../types';

interface TemplatesPageProps {
  templates: PromptTemplate[];
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  onSearch: (query: string, category: string) => void;
  onEditTemplate: (template: PromptTemplate) => void;
  onDeleteTemplate: (id: string) => void;
}

const TemplatesPage: React.FC<TemplatesPageProps> = ({
  templates,
  searchQuery,
  selectedCategory,
  categories,
  onSearch,
  onEditTemplate,
  onDeleteTemplate,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value, selectedCategory)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => onSearch(searchQuery, e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.length > 0 ? (
          templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={() => onEditTemplate(template)}
              onDelete={() => onDeleteTemplate(template.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No templates found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage; 