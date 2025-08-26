// components/windows/Window.tsx
'use client';

// This component is now DESKTOP-ONLY. All responsive logic has been removed.

import { motion } from 'framer-motion';
import { Rnd, DraggableData, ResizableDelta } from 'react-rnd';
import { DraggableEvent } from 'react-draggable';
import { useDesktopStore, AppWindow } from '@/store/desktopStore';
import React from 'react';
import Image from 'next/image';

interface WindowProps {
  app: AppWindow;
  children: React.ReactNode;
}

export default function Window({ app, children }: WindowProps) {
  const { 
    closeWindow, 
    focusWindow, 
    toggleMinimize, 
    toggleMaximize, 
    updateWindowPosition, 
    updateWindowSize 
  } = useDesktopStore();

  const MIN_WIDTH = 300;
  const MIN_HEIGHT = 200;

  const WindowContent = (
    <motion.div
      className="w-full h-full bg-window-bg flex flex-col overflow-hidden border border-window-header/50 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <div
        className="window-header h-8 bg-window-header flex items-center justify-between px-2 cursor-pointer flex-shrink-0"
        onDoubleClick={() => toggleMaximize(app.id)}
      >
        <span className="text-sm font-medium text-text-light select-none pl-2">{app.title}</span>
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMinimize(app.id); }} 
            className="w-6 h-6 flex items-center justify-center transition-transform hover:scale-110"
          >
            <Image src="/icons/minimize.svg" alt="Minimize" width={24} height={24} />
          </button>
          
          {app.isMaximized ? (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMaximize(app.id); }} 
              className="w-6 h-6 rounded-full bg-[#d1d1d1] hover:bg-gray-400 flex items-center justify-center transition-colors"
            >
              <Image src="/icons/restore.svg" alt="Restore" width={16} height={16} />
            </button>
          ) : (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMaximize(app.id); }} 
              className="w-6 h-6 flex items-center justify-center transition-transform hover:scale-110"
            >
              <Image src="/icons/maximize.svg" alt="Maximize" width={24} height={24} />
            </button>
          )}
          
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(app.id); }} 
            className="w-6 h-6 flex items-center justify-center transition-transform hover:scale-110"
          >
            <Image src="/icons/close.svg" alt="Close" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="flex-grow p-1 overflow-auto">
        {children}
      </div>
    </motion.div>
  );

  return (
    <Rnd
      size={app.isMaximized ? { width: '100%', height: '100%' } : app.size}
      position={app.isMaximized ? { x: 0, y: 0 } : app.position}
      onDragStop={(_e: DraggableEvent, d: DraggableData) => {
        if (d.y < 1) {
          toggleMaximize(app.id);
        } else {
          updateWindowPosition(app.id, { x: d.x, y: d.y });
        }
      }}
      onResizeStop={(
        _e: MouseEvent | TouchEvent, _direction: any, ref: HTMLElement,
        _delta: ResizableDelta, _position: { x: number; y: number }
      ) => {
        const newWidth = Math.max(MIN_WIDTH, parseInt(ref.style.width, 10));
        const newHeight = Math.max(MIN_HEIGHT, parseInt(ref.style.height, 10));
        updateWindowSize(app.id, { width: `${newWidth}px`, height: `${newHeight}px` });
      }}
      onMouseDown={() => focusWindow(app.id)}
      bounds="parent"
      minWidth={MIN_WIDTH}
      minHeight={MIN_HEIGHT}
      dragHandleClassName="window-header"
      disableDragging={app.isMaximized}
      enableResizing={!app.isMaximized}
      style={{ zIndex: app.zIndex }}
    >
      {WindowContent}
    </Rnd>
  );
}