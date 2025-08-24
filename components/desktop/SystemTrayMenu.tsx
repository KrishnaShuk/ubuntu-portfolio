// components/desktop/SystemTrayMenu.tsx
import Image from 'next/image';
import React from 'react';

// A reusable slider component for Volume and Brightness
const Slider = ({ iconSrc, alt }: { iconSrc: string; alt: string }) => (
  <div className="flex items-center space-x-3 px-2 py-1">
    <Image src={iconSrc} alt={alt} width={20} height={20} className="opacity-80" />
    <input 
      type="range" 
      defaultValue="80"
      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer range-thumb:w-4 range-thumb:h-4 range-thumb:bg-white range-thumb:rounded-full"
    />
  </div>
);

// A reusable toggle button component
const ToggleButton = ({ iconSrc, alt, label, sublabel, active }: { iconSrc: string; alt: string; label: string; sublabel?: string; active?: boolean }) => (
  <button 
    className={`flex items-center justify-between w-full p-2 rounded-lg text-left ${active ? 'bg-theme-olive text-white' : 'hover:bg-white/10'}`}
  >
    <div className="flex items-center space-x-2">
      <Image src={iconSrc} alt={alt} width={20} height={20} className={active ? 'brightness-200' : 'opacity-80'}/>
      <div>
        <div className="text-sm font-medium">{label}</div>
        {sublabel && <div className="text-xs opacity-70">{sublabel}</div>}
      </div>
    </div>
    <div className="border-l border-white/20 pl-2 ml-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </div>
  </button>
);

// A simple toggle button
const SimpleToggle = ({ iconSrc, alt, label, active }: { iconSrc: string; alt: string; label: string; active?: boolean }) => (
  <button 
    className={`flex items-center space-x-2 w-full p-2 rounded-lg text-left ${active ? 'bg-theme-olive text-white' : 'hover:bg-white/10'}`}
  >
    <Image src={iconSrc} alt={alt} width={20} height={20} className={active ? 'brightness-200' : 'opacity-80'}/>
    <span className="text-sm font-medium">{label}</span>
  </button>
);


export default function SystemTrayMenu() {
  return (
    <div className="absolute top-7 right-0 w-[360px] bg-[#242424] rounded-xl p-3 shadow-lg border border-white/10 text-white flex flex-col space-y-2">
      
      {/* Top Row: Battery and Action Icons */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2 text-sm">
          <Image src="/icons/battery.svg" alt="Battery" width={20} height={20} />
          <span>100%</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-2 rounded-full hover:bg-white/10"><Image src="/icons/screenshot.svg" alt="Screenshot" width={20} height={20} /></button>
          <button className="p-2 rounded-full hover:bg-white/10"><Image src="/icons/settings.svg" alt="Settings" width={20} height={20} /></button>
          <button className="p-2 rounded-full hover:bg-white/10"><Image src="/icons/lock.svg" alt="Lock" width={20} height={20} /></button>
          <button className="p-2 rounded-full hover:bg-white/10"><Image src="/icons/power.svg" alt="Power" width={20} height={20} /></button>
        </div>
      </div>

      {/* Sliders */}
      <div className="bg-black/20 rounded-lg p-1">
        <Slider iconSrc="/icons/volume.svg" alt="Volume" />
        <Slider iconSrc="/icons/brightness.svg" alt="Brightness" />
      </div>

      {/* Connectivity Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <ToggleButton iconSrc="/icons/wifi.svg" alt="Wi-Fi" label="Wi-Fi" sublabel="Krishna's A15" active />
        <ToggleButton iconSrc="/icons/bluetooth.svg" alt="Bluetooth" label="Bluetooth" />
      </div>
      
      {/* Mode Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <ToggleButton iconSrc="/icons/powermode.svg" alt="Power Mode" label="Power Mode" sublabel="Balanced" />
        <SimpleToggle iconSrc="/icons/nightlight.svg" alt="Night Light" label="Night Light" />
      </div>

      {/* Style and Airplane Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <SimpleToggle iconSrc="/icons/darkmode.svg" alt="Dark Style" label="Dark Style" active />
        <SimpleToggle iconSrc="/icons/airplane.svg" alt="Airplane Mode" label="Airplane Mode" />
      </div>

    </div>
  );
}