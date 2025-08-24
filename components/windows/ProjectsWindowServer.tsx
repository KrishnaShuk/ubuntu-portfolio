// components/windows/ProjectsWindowServer.tsx
import { promises as fs } from 'fs';
import path from 'path';
import ProjectsWindowClient from './ProjectsWindowClient'; 

// This is a Server Component (no 'use client')
export default async function ProjectsWindowServer() {
  const dataPath = path.join(process.cwd(), 'data', 'mydata');
  
  try {
    const [about, projects, experience, contributions] = await Promise.all([
      fs.readFile(path.join(dataPath, 'about.md'), 'utf8'),
      fs.readFile(path.join(dataPath, 'projects.md'), 'utf8'),
      fs.readFile(path.join(dataPath, 'experience.md'), 'utf8'),
      fs.readFile(path.join(dataPath, 'contributions.md'), 'utf8'),
    ]);

    const allContent = {
      'About Me': about,
      'Projects': projects,
      'Experience': experience,
      'Contributions': contributions,
    };

    // Render the Client Component, passing the fetched data as a prop
    return <ProjectsWindowClient initialContent={allContent} />;
    
  } catch (error) {
    console.error("Failed to read project files:", error);
    return <div className="p-4 text-red-500">Error: Could not load content.</div>;
  }
}