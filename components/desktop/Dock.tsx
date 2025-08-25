// components/desktop/Dock.tsx
'use client';

import { useDesktopStore } from '@/store/desktopStore';
import Image from 'next/image';
import { clsx } from 'clsx';
import React from 'react'; // Import React for ReactNode type

const apps = [
  { id: 'files', title: 'File Explorer', icon: '/icons/folder.svg' },
  { id: 'appstore', title: 'App Store', icon: '/icons/app-store.svg' },
  { id: 'terminal', title: 'Terminal', icon: '/icons/terminal.svg' },
  { id: 'vscode', title: 'VS Code', icon: '/icons/vscode.svg' },
  { id: 'chrome', title: 'Google Chrome', icon: '/icons/chrome.svg' },
  { id: 'about-portfolio', title: 'About this Portfolio', icon: '/icons/help.svg' },
];

// This component now expects the 'appContents' prop
export default function Dock({ appContents }: { appContents: { [key: string]: React.ReactNode } }) {
  const { windows, openWindow } = useDesktopStore();

  const handleOpen = (appId: string) => {
    if (appId === 'show-apps') {
      console.log('Show All Apps grid!');
      return;
    }

    const appConfig = apps.find((a) => a.id === appId);
    if (!appConfig) return;

    openWindow({
      id: appConfig.id,
      title: appConfig.title,
      icon: appConfig.icon,
      content: appContents[appId] || <p>Content for {appId} not found.</p>, // Get content from props
      position: { x: 150, y: 150 },
      size: { width: 700, height: 500 },
    });
  };

  return (
    <div className="w-20 bg-dock/60 flex flex-col items-center py-3 space-y-4 z-40 flex-shrink-0 ">
      {apps.map((app) => {
        const isOpen = windows.some(w => w.id === app.id);
        return (
          <div key={app.id} className="relative group">
            <button
              onClick={() => handleOpen(app.id)}
              className={clsx(
                "w-16 h-16  hover:bg-white/10 rounded-lg grid place-items-center transition-all duration-200",
                { "bg-white/10": isOpen }
              )}
            >
              <Image src={app.icon} alt={app.title} width={50} height={50} />
            </button>
            <span 
              className="absolute left-14 top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 
                         bg-top-bar text-text-light font-bold text-sm rounded-xl
                         whitespace-nowrap opacity-0 group-hover:opacity-100 
                         transition-opacity duration-200 pointer-events-none
                         group-hover:delay-300"
            >
              {app.title}
            </span>
          </div>
        );
      })}

      <div className="flex-grow"></div>

      <div className="relative group">
        <button
          onClick={() => handleOpen('show-apps')}
          className="w-18 h-15 mb-8 hover:bg-white/10 rounded-lg grid place-items-center transition-all duration-200"
        >
          <Image src="/ubuntu.svg" alt="Show Apps" width={40} height={32} />
        </button>
        <span 
          className="absolute left-9 top-5 -translate-y-1/2 ml-4 px-3 py-1.5 
                       bg-top-bar text-text-light font-bold text-sm rounded-xl 
                       whitespace-nowrap opacity-0 group-hover:opacity-100 
                       transition-opacity duration-200 pointer-events-none
                       group-hover:delay-300"
        >
          Show Apps
        </span>
      </div>
    </div>
  );
}