// components/desktop/Desktop.tsx
'use client';

import { useDesktopStore } from '@/store/desktopStore';
import Window from '../windows/Window';
import ProjectsWindow from '../windows-content/ProjectsWindow'; // Assuming you moved this
import { AnimatePresence } from 'framer-motion';

// A helper function to get the component for a specific app
const getAppComponent = (appId: string) => {
  switch (appId) {
    case 'files':
      return <ProjectsWindow />;
    default:
      return <p>Content for {appId}</p>;
  }
};

export default function Desktop() {
  const { windows } = useDesktopStore();

  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        {windows.map((app) => (
          !app.isMinimized && (
            <Window key={app.id} app={app}>
              {getAppComponent(app.id)}
            </Window>
          )
        ))}
      </AnimatePresence>
    </div>
  );
}