import React from 'react';

interface TagsPageProps {
  tags: string[];
  onSelectTag: (tag: string) => void;
}

const TagsPage: React.FC<TagsPageProps> = ({ tags, onSelectTag }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium cursor-pointer hover:bg-indigo-100"
            onClick={() => onSelectTag(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsPage; 