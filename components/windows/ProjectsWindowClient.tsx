// components/windows/ProjectsWindowClient.tsx
'use client';

import { useState } from 'react';
import { Project } from '@/data/projects';
import { Contribution } from '@/data/contributions';
import ContributionsView from '../views/ContributionsView';
import Image from 'next/image';
import { FiArrowLeft, FiExternalLink, FiGithub, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { clsx } from 'clsx';
import React from 'react'; // Import React for ReactNode type

// Combine all possible views into a single type
type View = 'About Me' | { projectDetail: Project } | 'Experience' | 'Contributions' | 'ProjectsList';

// Mobile Hamburger Menu Component
const MobileMenu = ({ sections, activeSection, setActiveSection, closeMenu }: { sections: string[], activeSection: string, setActiveSection: (view: View) => void, closeMenu: () => void }) => (
  <div className="md:hidden absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-50 p-4">
    <div className="bg-[#2c2c2c] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-200">Sections</h2>
        <button onClick={closeMenu} className="p-2 -mr-2"><FiX /></button>
      </div>
      <ul className="space-y-2">
        {sections.map(section => (
          <li key={section}>
            <button
              onClick={() => {
                const newView = section === 'Projects' ? 'ProjectsList' : section as View;
                setActiveSection(newView);
                closeMenu();
              }}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-lg text-gray-200 transition-colors duration-150",
                activeSection === section ? 'bg-theme-accent text-white' : 'hover:bg-white/10'
              )}
            >
              {section}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

interface ProjectsWindowClientProps {
  markdownContent: { [key: string]: string };
  projects: Project[];
  contributions: Contribution[];
}

export default function ProjectsWindowClient({ markdownContent, projects, contributions }: ProjectsWindowClientProps) {
  const [currentView, setCurrentView] = useState<View>('About Me');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getActiveSectionName = (): string => {
    if (typeof currentView === 'string') {
      if (currentView === 'ProjectsList') return 'Projects';
      return currentView;
    }
    if (typeof currentView === 'object' && 'projectDetail' in currentView) {
      return 'Projects';
    }
    return '';
  };

  const sectionsForNav = ['About Me', 'Projects', 'Experience', 'Contributions'];
  const activeSectionName = getActiveSectionName();

  const renderContent = (): React.ReactNode => {
    if (typeof currentView === 'string' && markdownContent[currentView]) {
      return (
        <article className="prose prose-sm md:prose-base prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300">
          <ReactMarkdown>{markdownContent[currentView]}</ReactMarkdown>
        </article>
      );
    }
    if (currentView === 'Contributions') {
      return <ContributionsView contributions={contributions} />;
    }
    if (currentView === 'ProjectsList') {
      return (
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <button key={project.id} onClick={() => setCurrentView({ projectDetail: project })} className="flex flex-col items-center text-center group">
              <Image src="/icons/folder.svg" alt="Project folder" width={80} height={80} className="transform transition-transform duration-150 group-hover:scale-105" />
              <p className="mt-2 text-sm text-gray-200 group-hover:underline">{project.name}</p>
            </button>
          ))}
        </div>
      );
    }
    if (typeof currentView === 'object' && 'projectDetail' in currentView) {
      const project = currentView.projectDetail;
      return (
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center p-2 border-b border-white/10 flex-shrink-0 -ml-4 md:-ml-8 -mr-4 md:-mr-8 -mt-4 md:-mt-8 mb-6">
            <button onClick={() => setCurrentView('ProjectsList')} className="flex items-center space-x-2 px-3 py-1 rounded-lg hover:bg-white/10">
              <FiArrowLeft />
              <span>Back to Projects</span>
            </button>
          </div>
          <div className="relative w-full h-48 md:h-64 mb-6 rounded-lg overflow-hidden">
            <Image src={project.image} alt={project.name} layout="fill" objectFit="cover" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-4">{project.name}</h3>
          <p className="text-gray-300 mb-6 text-sm md:text-base">{project.description}</p>
          <h4 className="text-lg md:text-xl font-semibold mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map(tech => (
              <span key={tech} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-xs md:text-sm">{tech}</span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-4 py-2 bg-theme-accent rounded-lg hover:opacity-90"><FiExternalLink /><span>Live Demo</span></a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500"><FiGithub /><span>View Code</span></a>}
          </div>
        </div>
      );
    }
    return <p>Select a section from the sidebar.</p>;
  };

  return (
    <div className="flex h-full bg-[#303030] text-text-light rounded-b-lg">
      <div className="hidden md:flex w-56 bg-[#2c2c2c] p-3 flex-shrink-0 flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-200">Sections</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setCurrentView('About Me')}
                className={clsx('w-full text-left px-3 py-2 rounded-lg text-gray-200 transition-colors duration-150', {
                  'bg-theme-accent text-white': activeSectionName === 'About Me',
                  'hover:bg-white/10': activeSectionName !== 'About Me',
                })}
              >
                About Me
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('ProjectsList')}
                className={clsx('w-full text-left px-3 py-2 rounded-lg text-gray-200 transition-colors duration-150', {
                  'bg-theme-accent text-white': activeSectionName === 'Projects',
                  'hover:bg-white/10': activeSectionName !== 'Projects',
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
                    'bg-theme-accent text-white': activeSectionName === section,
                    'hover:bg-white/10': activeSectionName !== section,
                  })}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <a
            href="/Krishna_Shukla_Resume.pdf"
            download
            className="w-full text-left px-3 py-2 rounded-lg text-gray-200 transition-colors duration-150"
          >
            <FiDownload />
            <span className="font-medium text-sm">Download Resume</span>
          </a>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto scrollbar-hide relative">
        <div className="md:hidden flex items-center justify-between mb-4 -mx-4 -mt-4 px-4 py-2 border-b border-white/10 bg-[#303030]">
          <span className="font-bold text-lg">{activeSectionName}</span>
          <button onClick={() => setIsMenuOpen(true)} className="p-2">
            <FiMenu size={20} />
          </button>
        </div>
        {isMenuOpen && (<MobileMenu sections={sectionsForNav} activeSection={activeSectionName} setActiveSection={setCurrentView} closeMenu={() => setIsMenuOpen(false)} />)}
        {renderContent()}
      </div>
    </div>
  );
}