import React, { useState } from "react";
import { X, Sliders } from "lucide-react";
import type { PromptTemplate, ModelConfig } from "../types";

interface TemplateFormProps {
  template?: PromptTemplate;
  onSubmit: (
    template: Omit<PromptTemplate, "id" | "createdAt" | "updatedAt">
  ) => void;
  onCancel: () => void;
}

const defaultModelConfig: ModelConfig = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1000,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

const availableModels = [
  "gpt-4",
  "gpt-4-turbo",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "claude-2",
  "claude-instant",
];

export function TemplateForm({
  template,
  onSubmit,
  onCancel,
}: TemplateFormProps) {
  const [formData, setFormData] = useState({
    title: template?.title || "",
    description: template?.description || "",
    template: template?.template || "",
    category: template?.category || "",
    tags: template?.tags?.join(", ") || "",
    modelConfig: template?.modelConfig || defaultModelConfig,
  });

  const [showModelConfig, setShowModelConfig] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  const handleModelConfigChange = (
    key: keyof ModelConfig,
    value: number | string
  ) => {
    setFormData((prev) => ({
      ...prev,
      modelConfig: {
        ...prev.modelConfig,
        [key]: value,
      },
    }));
  };

  const inputClasses =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm";
  const rangeClasses =
    "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {template ? "Edit Template" : "New Template"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={inputClasses}
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Template
            </label>
            <textarea
              value={formData.template}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, template: e.target.value }))
              }
              className={`${inputClasses} font-mono`}
              rows={4}
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Use {"{{variable}}"} syntax for template variables
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tags: e.target.value }))
              }
              className={inputClasses}
              placeholder="Separate tags with commas"
            />
          </div>

          <div className="border-t pt-4">
            <button
              type="button"
              onClick={() => setShowModelConfig(!showModelConfig)}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <Sliders className="h-4 w-4 mr-2" />
              {showModelConfig ? "Hide" : "Show"} Model Configuration
            </button>

            {showModelConfig && (
              <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Model
                  </label>
                  <select
                    value={formData.modelConfig.model}
                    onChange={(e) =>
                      handleModelConfigChange("model", e.target.value)
                    }
                    className={inputClasses}
                  >
                    {availableModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Temperature ({formData.modelConfig.temperature})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={formData.modelConfig.temperature}
                    onChange={(e) =>
                      handleModelConfigChange(
                        "temperature",
                        parseFloat(e.target.value)
                      )
                    }
                    className={rangeClasses}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Max Tokens ({formData.modelConfig.maxTokens})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="32000"
                    value={formData.modelConfig.maxTokens}
                    onChange={(e) =>
                      handleModelConfigChange(
                        "maxTokens",
                        parseInt(e.target.value)
                      )
                    }
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Top P ({formData.modelConfig.topP})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formData.modelConfig.topP}
                    onChange={(e) =>
                      handleModelConfigChange(
                        "topP",
                        parseFloat(e.target.value)
                      )
                    }
                    className={rangeClasses}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency Penalty ({formData.modelConfig.frequencyPenalty})
                  </label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={formData.modelConfig.frequencyPenalty}
                    onChange={(e) =>
                      handleModelConfigChange(
                        "frequencyPenalty",
                        parseFloat(e.target.value)
                      )
                    }
                    className={rangeClasses}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Presence Penalty ({formData.modelConfig.presencePenalty})
                  </label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={formData.modelConfig.presencePenalty}
                    onChange={(e) =>
                      handleModelConfigChange(
                        "presencePenalty",
                        parseFloat(e.target.value)
                      )
                    }
                    className={rangeClasses}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {template ? "Save Changes" : "Create Template"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
