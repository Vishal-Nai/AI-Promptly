import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { TemplateForm } from "./components/TemplateForm";
import { templateService } from "./services/templateService";
import type { PromptTemplate } from "./types";
import AboutPage from "./pages/AboutPage";
import TemplatesPage from "./pages/TemplatesPage";
import CategoriesPage from "./pages/CategoriesPage";
import TagsPage from "./pages/TagsPage";
import {
  initGA,
  trackGAEvent,
} from "./services/googleAnalytics";
import { trackMPEvent } from "./services/mixpanelService";

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
  const navigate = useNavigate();
  const location = useLocation();
  const userId = "example-user-id"; // Replace with actual user ID logic

  useEffect(() => {
    initGA(); // Initialize Google Analytics

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
    trackGAEvent("update_template", userId, {
      page: location.pathname,
      message: "Template updated",
    }); //For Google Analytics

    trackMPEvent("update_template", userId, {
      page: location.pathname,
      message: "Template updated",
    }); //For Mixpanel

    setTemplates(templateService.getTemplates());
    setEditingTemplate(undefined);
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      trackGAEvent("delete_template", userId, {
        page: location.pathname,
        message: "Template deleted",
      }); //For Google Analytics

      trackMPEvent("delete_template", userId, {
        page: location.pathname,
        message: "Template deleted",
      }); //For Mixpanel
      
      templateService.deleteTemplate(id);
      setTemplates(templateService.getTemplates());
    }
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setIsSidebarOpen(false); // Close sidebar on navigation (mobile)
    navigate(`/${view}`); // Update the URL
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onNewTemplate={() => setShowTemplateForm(true)}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onNavigate={handleNavigate}
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
            <Routes>
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/templates"
                element={
                  <TemplatesPage
                    templates={templates}
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    categories={categories}
                    onSearch={handleSearch}
                    onEditTemplate={setEditingTemplate}
                    onDeleteTemplate={handleDeleteTemplate}
                  />
                }
              />
              <Route
                path="/categories"
                element={
                  <CategoriesPage
                    categories={categories}
                    templates={templates}
                    onSelectCategory={(category) => {
                      setSelectedCategory(category);
                      handleNavigate("templates");
                    }}
                  />
                }
              />
              <Route
                path="/tags"
                element={
                  <TagsPage
                    tags={templateService.getTags()}
                    onSelectTag={(tag) => {
                      setSearchQuery(tag);
                      handleNavigate("templates");
                    }}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <TemplatesPage
                    templates={templates}
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    categories={categories}
                    onSearch={handleSearch}
                    onEditTemplate={setEditingTemplate}
                    onDeleteTemplate={handleDeleteTemplate}
                  />
                }
              />
            </Routes>
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
