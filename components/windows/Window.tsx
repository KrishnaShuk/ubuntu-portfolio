// components/windows/Window.tsx
'use client';

import { Rnd, DraggableData, ResizableDelta } from 'react-rnd';
import { DraggableEvent } from 'react-draggable';
import { useDesktopStore, AppWindow } from '@/store/desktopStore';
import React from 'react';

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
        _e: MouseEvent | TouchEvent,
        _direction: any,
        ref: HTMLElement,
        _delta: ResizableDelta,
        _position: { x: number; y: number }
      ) => {
        const finalWidth = parseInt(ref.style.width, 10);
        const finalHeight = parseInt(ref.style.height, 10);
        const newWidth = Math.max(MIN_WIDTH, finalWidth);
        const newHeight = Math.max(MIN_HEIGHT, finalHeight);
        updateWindowSize(app.id, {
          width: `${newWidth}px`,
          height: `${newHeight}px`,
        });
      }}
      onDragStart={() => focusWindow(app.id)}
      onMouseDown={() => focusWindow(app.id)}
      bounds="parent"
      minWidth={MIN_WIDTH}
      minHeight={MIN_HEIGHT}
      style={{ zIndex: app.zIndex }}
      className="border border-window-header/50 rounded-t-lg overflow-hidden bg-window-bg shadow-lg flex flex-col"
      dragHandleClassName="window-header"
      disableDragging={app.isMaximized}
      enableResizing={!app.isMaximized}
    >
      {/* --- MODIFIED SECTION: Window Header --- */}
      <div
        className="window-header h-8 bg-window-header flex items-center justify-between px-2 cursor-pointer flex-shrink-0"
        onDoubleClick={() => toggleMaximize(app.id)}
      >
        {/* Title is now on the left */}
        <span className="text-sm font-medium text-text-light select-none pl-2">{app.title}</span>

        {/* Buttons are now on the right */}
        <div className="flex items-center space-x-2">
          {/* Minimize Button */}
          <button 
            onClick={() => toggleMinimize(app.id)} 
            className="w-6 h-6 rounded-full bg-gray-700/80 hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <div className="w-3 h-px bg-white" />
          </button>
          {/* Maximize/Restore Button */}
          <button 
            onClick={() => toggleMaximize(app.id)} 
            className="w-6 h-6 rounded-full bg-gray-700/80 hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <div className="w-2.5 h-2.5 border border-white rounded-sm" />
          </button>
          {/* Close Button */}
          <button 
            onClick={() => closeWindow(app.id)} 
            className="w-6 h-6 rounded-full bg-gray-700/80 hover:bg-red-500 flex items-center justify-center transition-colors"
          >
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      {/* --- END OF MODIFIED SECTION --- */}

      {/* Window Content */}
      <div className="flex-grow p-1 overflow-auto">
        {children}
      </div>
    </Rnd>
  );
}