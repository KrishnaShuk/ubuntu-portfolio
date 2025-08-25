// components/windows/ProjectsWindowServer.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { projects } from '@/data/projects';
// --- 1. IMPORT THE NEW CONTRIBUTIONS DATA ---
import { contributions } from '@/data/contributions'; 
import ProjectsWindowClient from './ProjectsWindowClient';

export default async function ProjectsWindowServer() {
  const dataPath = path.join(process.cwd(), 'data', 'mydata');
  
  try {
    const [about, experience] = await Promise.all([
      fs.readFile(path.join(dataPath, 'about.md'), 'utf8'),
      fs.readFile(path.join(dataPath, 'experience.md'), 'utf8'),
    ]);

    const markdownContent = {
      'About Me': about,
      'Experience': experience,
    };

    // --- 2. PASS THE CONTRIBUTIONS ARRAY AS A PROP ---
    return <ProjectsWindowClient 
      markdownContent={markdownContent} 
      projects={projects} 
      contributions={contributions} 
    />;
    
  } catch (error) {
    console.error("Failed to read content files:", error);
    return <div className="p-4 text-red-500">Error: Could not load content.</div>;
  }
}