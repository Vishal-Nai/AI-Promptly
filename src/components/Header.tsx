import { BookTemplate, Plus, Menu } from "lucide-react";
import { trackMPEvent } from "../services/mixpanelService";
import { trackGAEvent } from "../services/googleAnalytics";

interface HeaderProps {
  onNewTemplate: () => void;
  onMenuClick: () => void;
  onNavigate: (view: string) => void;
}

export function Header({
  onNewTemplate,
  onMenuClick,
  onNavigate,
}: HeaderProps) {
  const userId = "example-user-id"; // Replace with actual user ID logic

  const handleMenuClick = () => {
    trackMPEvent("Menu Click", userId);
    onMenuClick();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={handleMenuClick}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center ml-2 md:ml-0">
              <BookTemplate className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                AI-Promptly
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate("about")}
            className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            About Us
          </button>
          <button
            onClick={onNewTemplate}
            className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 sm:mr-2" />
            <span
              className="hidden sm:inline"
              onClick={() => {
                trackMPEvent("new_template_click", userId, {
                  page: window.location.pathname,
                  message: "New Template button clicked",
                });

                trackGAEvent("new_template_click", userId, {
                  page: window.location.pathname,
                  message: "New Template button clicked",
                });  
              }}
            >
              New Template
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
