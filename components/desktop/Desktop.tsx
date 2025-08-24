// components/desktop/Desktop.tsx
'use client';

import { useDesktopStore } from '@/store/desktopStore';
import Window from '../windows/Window';
// NEW: Import the ProjectsWindow component
import ProjectsWindow from '../windows/ProjectsWindow';
import { AnimatePresence } from 'framer-motion';



// NEW: A helper function to get the component for a specific app
const getAppComponent = (appId: string) => {
  switch (appId) {
    case 'files':
      return <ProjectsWindow />;
    // We will add more cases here for other apps later
    // case 'terminal':
    //   return <TerminalWindow />;
    default:
      // A fallback for apps that don't have a component yet
      return <p>Content for {appId}</p>;
  }
};

export default function Desktop() {
  const { windows } = useDesktopStore();

  return (
    <div className="w-full h-full relative">
      {/* --- NEW: Wrap the map in AnimatePresence --- */}
      <AnimatePresence>
        {windows.filter(app => !app.isMinimized).map((app) => (
          <Window key={app.id} app={app}>
            {getAppComponent(app.id)}
          </Window>
        ))}
      </AnimatePresence>
    </div>
  );
}