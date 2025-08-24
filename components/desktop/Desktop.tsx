// components/desktop/Desktop.tsx
'use client';

import { useDesktopStore } from '@/store/desktopStore';
import Window from '../windows/Window';
import { AnimatePresence } from 'framer-motion';

// The getAppComponent function is no longer needed here

export default function Desktop() {
  const { windows } = useDesktopStore();

  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        {windows.map((app) => (
          !app.isMinimized && (
            <Window key={app.id} app={app}>
              {/* Simply render the content from the store */}
              {app.content}
            </Window>
          )
        ))}
      </AnimatePresence>
    </div>
  );
}