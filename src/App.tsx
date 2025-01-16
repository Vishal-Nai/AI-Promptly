import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { TemplateCard } from "./components/TemplateCard";
import { TemplateForm } from "./components/TemplateForm";
import { templateService } from "./services/templateService";
import type { PromptTemplate } from "./types";

function App() {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<
    PromptTemplate | undefined
  >();
  const [currentView, setCurrentView] = useState("templates");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setTemplates(templateService.getTemplates());
    setCategories(["All Categories", ...templateService.getCategories()]);
  }, []);

  const handleSearch = (query: string, category: string) => {
    const results = templateService.searchTemplates(query, category);
    setTemplates(results);
  };

  const handleCreateTemplate = (
    template: Omit<PromptTemplate, "id" | "createdAt" | "updatedAt">
  ) => {
    templateService.createTemplate(template);
    setTemplates(templateService.getTemplates());
    setShowTemplateForm(false);
  };

  const handleUpdateTemplate = (
    id: string,
    template: Partial<PromptTemplate>
  ) => {
    templateService.updateTemplate(id, template);
    setTemplates(templateService.getTemplates());
    setEditingTemplate(undefined);
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      templateService.deleteTemplate(id);
      setTemplates(templateService.getTemplates());
    }
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setIsSidebarOpen(false); // Close sidebar on navigation (mobile)
  };

  const renderContent = () => {
    switch (currentView) {
      case "templates":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value, selectedCategory);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  handleSearch(searchQuery, e.target.value);
                }}
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
                    onEdit={() => setEditingTemplate(template)}
                    onDelete={() => handleDeleteTemplate(template.id)}
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
      case "categories":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateService.getCategories().map((category) => (
              <div
                key={category}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category);
                  handleNavigate("templates");
                }}
              >
                <h3 className="font-medium text-lg">{category}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  {templates.filter((t) => t.category === category).length}{" "}
                  templates
                </p>
              </div>
            ))}
          </div>
        );
      case "tags":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {templateService.getTags().map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium cursor-pointer hover:bg-indigo-100"
                  onClick={() => {
                    setSearchQuery(tag);
                    handleNavigate("templates");
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onNewTemplate={() => setShowTemplateForm(true)}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {currentView === "templates" && (
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {selectedCategory === "All Categories"
                    ? "All Templates"
                    : selectedCategory}
                </h1>
              </div>
            )}
            {renderContent()}
          </div>
        </main>
      </div>

      {(showTemplateForm || editingTemplate) && (
        <TemplateForm
          template={editingTemplate}
          onSubmit={(template) => {
            if (editingTemplate) {
              handleUpdateTemplate(editingTemplate.id, template);
            } else {
              handleCreateTemplate(template);
            }
          }}
          onCancel={() => {
            setShowTemplateForm(false);
            setEditingTemplate(undefined);
          }}
        />
      )}
    </div>
  );
}

export default App;
