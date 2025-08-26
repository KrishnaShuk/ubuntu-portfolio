// store/desktopStore.ts
import { create } from 'zustand';
import React from 'react';

export interface AppWindow {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  lastPosition?: { x: number; y: number };
  size: { width: number | string; height: number | string };
  lastSize?: { width: number | string; height: number | string };
}

interface DesktopState {
  windows: AppWindow[];
  openWindow: (app: Omit<AppWindow, 'zIndex' | 'isMinimized' | 'isMaximized'>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: string; height: string }) => void;
}

const getHighestZIndex = (windows: AppWindow[]) => {
  if (windows.length === 0) return 0;
  return Math.max(...windows.map(w => w.zIndex));
};

export const useDesktopStore = create<DesktopState>((set) => ({
  windows: [],

  openWindow: (app) => set((state) => {
    // Use md (768px) as the breakpoint between mobile and desktop
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const existingWindow = state.windows.find(w => w.id === app.id);
    
    // Mobile logic: Only ever allow one window in the state.
    if (isMobile) {
      if (existingWindow) {
        // If it's already open, do nothing.
        return { windows: [{ ...existingWindow, isMinimized: false, isMaximized: true }] };
      }
      // If a new window is opened, it replaces any other.
      return { windows: [{ ...app, zIndex: 1, isMinimized: false, isMaximized: true }] };
    }

    // Desktop logic (unchanged)
    if (existingWindow) {
      return {
        windows: state.windows.map(w =>
          w.id === app.id ? { ...w, zIndex: getHighestZIndex(state.windows) + 1, isMinimized: false } : w
        ),
      };
    }
    return {
      windows: [
        ...state.windows,
        { ...app, zIndex: getHighestZIndex(state.windows) + 1, isMinimized: false, isMaximized: false },
      ],
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id),
  })),

  focusWindow: (id) => set((state) => {
    const highestZIndex = getHighestZIndex(state.windows);
    return {
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
      ),
    };
  }),

  toggleMinimize: (id) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ),
  })),

  toggleMaximize: (id) => set((state) => ({
    windows: state.windows.map(w => {
      if (w.id === id) {
        return w.isMaximized ? {
          ...w,
          isMaximized: false,
          position: w.lastPosition || { x: 150, y: 150 },
          size: w.lastSize || { width: 700, height: 500 },
        } : {
          ...w,
          isMaximized: true,
          lastPosition: w.position,
          lastSize: w.size,
        };
      }
      return w;
    }),
  })),

  updateWindowPosition: (id, position) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, position } : w
    ),
  })),

  updateWindowSize: (id, size) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, size } : w
    ),
  })),
}));