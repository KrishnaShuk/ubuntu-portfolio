// components/desktop/TopBar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SystemTrayMenu from './SystemTrayMenu';

export default function TopBar() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const trayRef = useRef<HTMLDivElement>(null);

  // Effect for updating the time and date
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDate(now.toLocaleString(undefined, { month: 'short', day: 'numeric' }));
      setTime(now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }));
    };

    updateDateTime(); // Set initial time
    const timer = setInterval(updateDateTime, 1000 * 30); // Update every 30 seconds

    return () => clearInterval(timer);
  }, []);

  // Effect for handling click-away to close the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (trayRef.current && !trayRef.current.contains(event.target as Node)) {
        setIsTrayOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trayRef]);

  return (
    <div className="h-8 bg-top-bar flex items-center justify-between px-2 text-sm z-50 flex-shrink-0">
      
      {/* --- MODIFIED SECTION: Activities Icon --- */}
      <button className="px-1 py-2 rounded hover:bg-white/10 transition-colors">
        <div className="flex items-center space-x-1.5">
          {/* White Pill */}
          <div className="w-7 h-2.5 bg-white rounded-full"></div>
          {/* Gray Dots */}
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
        </div>
      </button>
      {/* --- END OF MODIFIED SECTION --- */}

      {/* Center: Clock */}
      <button className="px-3 py-0.5 rounded hover:bg-white/10 transition-colors">
        <span>{date}</span>
        <span className="ml-2 font-semibold">{time}</span>
      </button>

      {/* Right Side: System Tray */}
      <div className="relative" ref={trayRef}>
        <button 
          onClick={() => setIsTrayOpen(!isTrayOpen)}
          className="flex items-center space-x-3 px-3 py-0.5 rounded hover:bg-white/10 transition-colors"
        >
          <Image src="/icons/wifi.svg" alt="Wi-Fi" width={16} height={16} />
          <Image src="/icons/volume.svg" alt="Volume" width={16} height={16} />
          <Image src="/icons/battery.svg" alt="Battery" width={16} height={16} />
        </button>
        {isTrayOpen && <SystemTrayMenu />}
      </div>
    </div>
  );
}