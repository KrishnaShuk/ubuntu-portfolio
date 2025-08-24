// components/windows/ProjectsWindow.tsx
import { projects } from '@/data/projects';
import Image from 'next/image';

export default function ProjectsWindow() {
  return (
    <div className="flex h-full bg-window-bg text-text-light">
      {/* Sidebar */}
      <div className="w-48 bg-window-header p-2">
        <h3 className="font-bold mb-2">Favorites</h3>
        <ul>
          <li className="p-1 rounded bg-theme-accent text-white">Home</li>
          <li className="p-1 rounded hover:bg-white/10">Documents</li>
          <li className="p-1 rounded hover:bg-white/10">Downloads</li>
          <li className="p-1 rounded hover:bg-white/10">Desktop</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="text-center cursor-pointer group">
            <Image
              src="/icons/folder.svg" // We use a generic folder icon for the list view
              alt={project.name}
              width={64}
              height={64}
              className="mx-auto"
            />
            <p className="mt-2 text-sm group-hover:underline">{project.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}