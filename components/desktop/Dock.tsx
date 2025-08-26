// components/desktop/Dock.tsx
'use client';

import { useDesktopStore } from '@/store/desktopStore';
import Image from 'next/image';
import { clsx } from 'clsx';
import React from 'react';

const apps = [
  { id: 'files', title: 'File Explorer', icon: '/icons/folder.svg' },
  { id: 'chrome', title: 'Google Chrome', icon: '/icons/chrome.svg' },
  { id: 'vscode', title: 'VS Code', icon: '/icons/vscode.svg' },
  { id: 'terminal', title: 'Terminal', icon: '/icons/terminal.svg' },
  { id: 'appstore', title: 'App Store', icon: '/icons/app-store.svg' },
  { id: 'about-portfolio', title: 'About this Portfolio', icon: '/icons/help.svg' },
];

export default function Dock({ appContents }: { appContents: { [key: string]: React.ReactNode } }) {
  const { windows, openWindow } = useDesktopStore();

  const handleOpen = (appId: string) => {
    const appConfig = apps.find((a) => a.id === appId);
    if (!appConfig) {
      if (appId === 'show-apps') console.log('Show All Apps grid!');
      return;
    }

    openWindow({
      id: appConfig.id,
      title: appConfig.title,
      icon: appConfig.icon,
      content: appContents[appId] || <p>Content for {appId} not found.</p>,
      position: { x: 150, y: 150 },
      size: { width: 700, height: 500 },
    });
  };

  return (
    // Base styles are for the mobile tab bar. `md:` prefixes transform it for desktop.
     <div className="fixed bottom-0 left-0 w-full h-16 bg-dock/80 backdrop-blur-md flex justify-around items-center z-50 border-t border-white/10
                   md:relative md:w-16 md:h-full md:flex-col md:justify-start md:py-3 md:space-y-4 md:border-t-0 md:border-r">
      
      {apps.map((app) => {
        const isOpen = windows.some(w => w.id === app.id);
        return (
          <div key={app.id} className="relative group">
            <button
              onClick={() => handleOpen(app.id)}
              className={clsx(
                "w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-200", // Base mobile styles
                "md:w-18 md:h-15 md:p-1 md:bg-transparent md:hover:bg-white/10", // Desktop overrides
                {
                  "bg-white/10 scale-105 md:bg-white/10 md:scale-100": isOpen,
                  "scale-90 opacity-80 md:scale-100 md:opacity-100": !isOpen
                }
              )}
              title={app.title}
            >
              <Image src={app.icon} alt={app.title} width={50} height={50}  />
            </button>
            <span 
              className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 
                         bg-top-bar text-text-light font-bold text-sm rounded-xl
                         whitespace-nowrap opacity-0 group-hover:opacity-100 
                         transition-opacity duration-200 pointer-events-none group-hover:delay-300"
            >
              {app.title}
            </span>
          </div>
        );
      })}

      {/* Spacer and "Show Apps" are hidden on mobile, visible on desktop */}
      <div className="hidden md:block flex-grow"></div>
      <div className="hidden md:block relative group">
        <button
          onClick={() => handleOpen('show-apps')}
          className="w-18 h-15 mb-8 hover:bg-white/10 rounded-lg grid place-items-center transition-all duration-200"
        >
          <Image src="/ubuntu.svg" alt="Show Apps" width={40} height={32} />
        </button>
        <span 
          className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 
                       bg-top-bar text-text-light font-bold text-sm rounded-xl 
                       whitespace-nowrap opacity-0 group-hover:opacity-100 
                       transition-opacity duration-200 pointer-events-none group-hover:delay-300"
        >
          Show Apps
        </span>
      </div>
    </div>
  );
}