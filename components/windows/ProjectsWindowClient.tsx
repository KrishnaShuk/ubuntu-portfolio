// components/windows/ProjectsWindowClient.tsx
'use client'; // This is a Client Component

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { clsx } from 'clsx';

const sections = ['About Me', 'Projects', 'Experience', 'Contributions'];

interface ProjectsWindowClientProps {
  initialContent: { [key: string]: string };
}

export default function ProjectsWindowClient({ initialContent }: ProjectsWindowClientProps) {
  const [activeSection, setActiveSection] = useState('About Me');

  return (
    <div className="flex h-full bg-[#303030] text-text-light rounded-b-lg">
      
      {/* Sidebar */}
      <div className="w-56 bg-[#2c2c2c] p-3 flex-shrink-0">
        <h2 className="text-base font-bold mb-4 text-gray-200">Sections</h2>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section}>
              <button
                onClick={() => setActiveSection(section)}
                className={clsx(
                  'w-full text-left px-3 py-2 rounded-lg text-gray-200 transition-colors duration-150',
                  {
                    'bg-theme-accent text-white': activeSection === section,
                    'hover:bg-white/10': activeSection !== section,
                  }
                )}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <article className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300">
          <ReactMarkdown>{initialContent[activeSection]}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}