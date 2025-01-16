import { Layout, Settings, BookOpen, Tag, FolderOpen, X } from "lucide-react";

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  currentView,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) {
  const navigation = [
    { name: "All Templates", view: "templates", icon: Layout },
    { name: "Categories", view: "categories", icon: FolderOpen },
    { name: "Tags", view: "tags", icon: Tag },
    { name: "Documentation", view: "documentation", icon: BookOpen },
    { name: "Settings", view: "settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static inset-y-0 left-0 z-30 w-64 bg-gray-50 border-r border-gray-200
          transform transition-transform duration-300 ease-in-out md:transform-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 md:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => onNavigate(item.view)}
              className={`
                w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md
                transition-colors duration-150 ease-in-out
                ${
                  currentView === item.view
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <item.icon
                className={`
                  mr-3 h-5 w-5 transition-colors duration-150 ease-in-out
                  ${
                    currentView === item.view
                      ? "text-indigo-600"
                      : "text-gray-400 group-hover:text-gray-500"
                  }
                `}
              />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
