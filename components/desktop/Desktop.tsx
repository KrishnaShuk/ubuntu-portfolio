// components/desktop/Desktop.tsx
'use client';

import { useDesktopStore } from '@/store/desktopStore';
import Window from '../windows/Window';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react'; // Import useEffect and useRef

// Define the shape of the props
interface DesktopProps {
  appContents: { [key: string]: React.ReactNode };
}

export default function Desktop({ appContents }: DesktopProps) {
  const { windows, openWindow } = useDesktopStore();
  // A ref to ensure we only open the initial window once
  const initialWindowOpened = useRef(false);

  // useEffect runs on the client after the component mounts
  useEffect(() => {
    // Check if the initial window has already been opened
    if (!initialWindowOpened.current) {
      // Open the 'files' app by default
      openWindow({
        id: 'files',
        title: 'File Explorer',
        icon: '/icons/folder.svg',
        content: appContents['files'],
        position: { x: 100, y: 50 }, // Set a nice initial position
        size: { width: 800, height: 600 },
      });
      // Mark it as opened so it doesn't open again on re-renders
      initialWindowOpened.current = true;
    }
  }, [appContents, openWindow]); // Dependencies for the effect

  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        {windows.map((app) => (
          !app.isMinimized && (
            <Window key={app.id} app={app}>
              {app.content}
            </Window>
          )
        ))}
      </AnimatePresence>
    </div>
  );
}