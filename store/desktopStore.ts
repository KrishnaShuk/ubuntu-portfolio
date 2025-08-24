// store/desktopStore.ts
import { create } from 'zustand';

export interface AppWindow {
  id: string;
  title: string;
  icon: string;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  lastPosition?: { x: number; y: number };
  // --- CHANGED: Allow size properties to be number OR string ---
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
  // --- CHANGED: The 'size' parameter now accepts strings ---
  updateWindowSize: (id: string, size: { width: string; height: string }) => void;
}

const getHighestZIndex = (windows: AppWindow[]) => {
  if (windows.length === 0) return 0;
  return Math.max(...windows.map(w => w.zIndex));
};

export const useDesktopStore = create<DesktopState>((set) => ({
  windows: [],
  
  // No changes to the actions below until updateWindowSize
  openWindow: (app) => set((state) => {
    if (state.windows.some(w => w.id === app.id)) {
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
        w.id === id ? { ...w, zIndex: highestZIndex + 1, isMinimized: false } : w
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

  // --- CHANGED: The 'size' parameter type is now correct ---
  updateWindowSize: (id, size) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, size } : w
    ),
  })),
}));