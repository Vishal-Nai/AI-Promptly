import React from 'react';
import { PromptTemplate } from '../types';

interface CategoriesPageProps {
  categories: string[];
  templates: PromptTemplate[];
  onSelectCategory: (category: string) => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({
  categories,
  templates,
  onSelectCategory,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category}
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelectCategory(category)}
        >
          <h3 className="font-medium text-lg">{category}</h3>
          <p className="text-sm text-gray-500 mt-2">
            {templates.filter((t) => t.category === category).length} templates
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage; 