'use client';

import { useDesktopStore } from '@/store/desktopStore';
import Window from '../windows/Window';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react'; 

interface DesktopProps {
  appContents: { [key: string]: React.ReactNode };
}

export default function Desktop({ appContents }: DesktopProps) {
  const { windows, openWindow } = useDesktopStore();
  const initialWindowOpened = useRef(false);

  useEffect(() => {
    if (!initialWindowOpened.current) {
      openWindow({
        id: 'files',
        title: 'File Explorer',
        icon: '/icons/folder.svg',
        content: appContents['files'],
        position: { x: 100, y: 50 }, 
        size: { width: 800, height: 600 },
      });
      initialWindowOpened.current = true;
    }
  }, [appContents, openWindow]); 

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