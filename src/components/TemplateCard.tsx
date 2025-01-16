import { Edit2, Trash2, Copy, Sliders } from "lucide-react";
import type { PromptTemplate } from "../types";

interface TemplateCardProps {
  template: PromptTemplate;
  onEdit: () => void;
  onDelete: () => void;
}

export function TemplateCard({
  template,
  onEdit,
  onDelete,
}: TemplateCardProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.template);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy template:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {template.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {template.description}
          </p>
        </div>
        <div className="flex space-x-1 sm:space-x-2 ml-4">
          <button
            onClick={handleCopy}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors"
            title="Copy template"
          >
            <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors"
            title="Edit template"
          >
            <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
            title="Delete template"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm">
          <span className="font-medium text-gray-900">Category:</span>
          <span className="ml-2 text-gray-600">{template.category}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 flex-wrap gap-2">
          <div className="flex items-center">
            <Sliders className="h-4 w-4 mr-2" />
            <span className="font-medium">{template.modelConfig.model}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-sm">
            temp: {template.modelConfig.temperature}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
