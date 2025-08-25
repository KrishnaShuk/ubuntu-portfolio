// components/windows/ProjectsWindowClient.tsx
'use client';

import { useState } from 'react';
import { Project } from '@/data/projects';
import { Contribution } from '@/data/contributions';
import ContributionsView from '../views/ContributionsView';
import Image from 'next/image';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { clsx } from 'clsx';

// Define the shape of the props
interface ProjectsWindowClientProps {
  markdownContent: { [key: string]: string };
  projects: Project[];
  contributions: Contribution[]; 
}

// Combine all possible views into a single type
type View = 'About Me'| { projectDetail: Project } | 'Experience' | 'Contributions' | 'ProjectsList' ;

export default function ProjectsWindowClient({ markdownContent, projects, contributions }: ProjectsWindowClientProps) {
  const [currentView, setCurrentView] = useState<View>('About Me');

  const renderContent = () => {
    if (typeof currentView === 'string' && markdownContent[currentView]) {
      // --- MARKDOWN VIEW ---
      return (
        <article className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300">
          <ReactMarkdown>{markdownContent[currentView]}</ReactMarkdown>
        </article>
      );
    }

    if (currentView === 'Contributions') {
      return <ContributionsView contributions={contributions} />;
    }

    if (currentView === 'ProjectsList') {
      // --- PROJECTS LIST VIEW ---
      return (
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {projects.map((project) => (
            <button 
              key={project.id} 
              onClick={() => setCurrentView({ projectDetail: project })}
              className="flex flex-col items-center text-center group"
            >
              <Image src="/icons/folder.svg" alt="Project folder" width={80} height={80} className="transform transition-transform duration-150 group-hover:scale-105" />
              <p className="mt-2 text-sm text-gray-200 group-hover:underline">{project.name}</p>
            </button>
          ))}
        </div>
      );
    }

    if (typeof currentView === 'object' && 'projectDetail' in currentView) {
      // --- PROJECT DETAIL VIEW ---
      const project = currentView.projectDetail;
      return (
        <div className="flex flex-col h-full w-full">
          {/* Header with Back Button */}
          <div className="flex items-center p-2 border-b border-white/10 flex-shrink-0 -ml-8 -mr-8 -mt-8 mb-6">
            <button onClick={() => setCurrentView('ProjectsList')} className="flex items-center space-x-2 px-3 py-1 rounded-lg hover:bg-white/10">
              <FiArrowLeft />
              <span>Back to Projects</span>
            </button>
          </div>
          {/* Content */}
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image src={project.image} alt={project.name} layout="fill" objectFit="cover" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
          <p className="text-gray-300 mb-6">{project.description}</p>
          <h4 className="text-xl font-semibold mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map(tech => (
              <span key={tech} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">{tech}</span>
            ))}
          </div>
          <div className="flex space-x-4">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-theme-accent rounded-lg hover:opacity-90"><FiExternalLink /><span>Live Demo</span></a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500"><FiGithub /><span>View Code</span></a>}
          </div>
        </div>
      );
    }
    
    return <p>Select a section from the sidebar.</p>;
  };

  return (
    <div className="flex h-full bg-[#303030] text-text-light rounded-b-lg">
      
      {/* Sidebar */}
      <div className="w-56 bg-[#2c2c2c] p-3 flex-shrink-0">
        <h2 className="text-lg font-bold mb-4 text-gray-200">Sections</h2>
        <ul className="space-y-2">
            <li>
              <button
                onClick={() => setCurrentView('About Me' as View)}
                className={clsx('w-full text-left px-3 py-2 rounded-lg text-gray-200 transition-colors duration-150', {
                  'bg-theme-accent text-white': currentView === 'About Me',
                  'hover:bg-white/10': currentView !== 'About Me',
                })}
              >
                About Me
              </button>
            </li>
          
          <li>
            <button
              onClick={() => setCurrentView('ProjectsList')}
              className={clsx('w-full text-left px-3 py-2 rounded-lg text-gray-200 transition-colors duration-150', {
                'bg-theme-accent text-white': currentView === 'ProjectsList' || (typeof currentView === 'object' && 'projectDetail' in currentView),
                'hover:bg-white/10': currentView !== 'ProjectsList' && !(typeof currentView === 'object' && 'projectDetail' in currentView),
              })}
            >
              Projects
            </button>
          </li>
          {['Experience', 'Contributions'].map((section) => (
            <li key={section}>
              <button
                onClick={() => setCurrentView(section as View)}
                className={clsx('w-full text-left px-3 py-2 rounded-lg text-gray-200 transition-colors duration-150', {
                  'bg-theme-accent text-white': currentView === section,
                  'hover:bg-white/10': currentView !== section,
                })}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      {/* --- THIS IS THE ONLY CHANGE: 'scrollbar-hide' has been added --- */}
      <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
        {renderContent()}
      </div>
    </div>
  );
}