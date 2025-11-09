'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const Slider = ({ iconSrc, alt, value, onChange }: { iconSrc: string; alt: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex items-center space-x-3 px-2 py-1.5">
    <Image src={iconSrc} alt={alt} width={20} height={20} className="opacity-70" />
    <div className="relative w-full flex items-center">
      <input 
        type="range" 
        min="0"
        max="100"
        value={value}
        onChange={onChange}
        className="w-full h-1.5 bg-transparent appearance-none cursor-pointer z-10 focus:outline-none accent-white
                   range-thumb:w-4 range-thumb:h-4 range-thumb:bg-white range-thumb:rounded-full 
                   range-thumb:appearance-none range-thumb:border-none range-thumb:shadow-md"
      />
      <div className="absolute w-full h-1.5 bg-black/30 rounded-full"></div>
      <div className="absolute h-1.5 bg-theme-accent rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const ComplexToggle = ({ iconSrc, alt, label, sublabel, active, onClick }: { iconSrc: string; alt: string; label: string; sublabel?: string; active: boolean; onClick: () => void }) => (
  <div className={`flex rounded-lg min-h-[56px] ${active ? 'bg-theme-accent text-white' : 'bg-black/20 text-gray-300'}`}>
    <button onClick={onClick} className="flex-grow flex items-center space-x-2 p-2 rounded-l-lg hover:bg-white/10 transition-colors duration-150">
      <Image src={iconSrc} alt={alt} width={20} height={20} className={active ? '' : 'opacity-70'}/>
      <div>
        <div className="text-sm font-medium">{label}</div>
        {sublabel && <div className="text-xs opacity-80">{sublabel}</div>}
      </div>
    </button>
    <button className="border-l border-white/10 px-2 rounded-r-lg hover:bg-white/10 transition-colors duration-150">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </button>
  </div>
);

const SimpleToggle = ({ iconSrc, alt, label, active, onClick }: { iconSrc: string; alt: string; label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-2 w-full p-2 rounded-lg text-left min-h-[56px] transition-colors duration-150 ${active ? 'bg-theme-accent text-white' : 'bg-black/20 text-gray-300 hover:bg-white/10'}`}
  >
    <Image src={iconSrc} alt={alt} width={20} height={20} className={active ? '' : 'opacity-70'}/>
    <span className="text-sm font-medium">{label}</span>
  </button>
);


export default function SystemTrayMenu() {
  // --- STATE MANAGEMENT ---
  const [sliderValues, setSliderValues] = useState({ volume: 80, brightness: 60 });
  const [toggles, setToggles] = useState({
    wifi: true,
    bluetooth: false,
    powerMode: false,
    nightLight: false,
    darkStyle: true,
    airplaneMode: false,
  });

  const handleSliderChange = (slider: 'volume' | 'brightness') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValues(prev => ({ ...prev, [slider]: Number(e.target.value) }));
  };

  const handleToggle = (toggle: keyof typeof toggles) => () => {
    setToggles(prev => ({ ...prev, [toggle]: !prev[toggle] }));
  };

  return (
    <div className="absolute top-7 right-0 w-[360px] bg-[#2d2d2d] rounded-xl p-3 shadow-lg border border-white/10 text-white flex flex-col space-y-2">
      
      {/* Top Row */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-white/10">
          <Image src="/icons/battery.svg" alt="Battery" width={24} height={24} />
          <span>100%</span>
        </div>
        <div className="flex items-center space-x-1 bg-black/20 rounded-full">
          <button className="p-2 rounded-full hover:bg-white/10"><Image src="/icons/settings.svg" alt="Settings" width={18} height={18} /></button>
          <button className="p-2 rounded-full hover:bg-white/10"><Image src="/icons/lock.svg" alt="Lock" width={18} height={18} /></button>
          <button className="p-2 rounded-full hover:bg-white/10"><Image src="/icons/power.svg" alt="Power" width={18} height={18} /></button>
        </div>
      </div>

      {/* Sliders */}
      <div className="bg-black/20 rounded-lg p-1">
        <Slider iconSrc="/icons/volume.svg" alt="Volume" value={sliderValues.volume} onChange={handleSliderChange('volume')} />
        <Slider iconSrc="/icons/brightness.svg" alt="Brightness" value={sliderValues.brightness} onChange={handleSliderChange('brightness')} />
      </div>

      {/* Connectivity Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <ComplexToggle iconSrc="/icons/wifi.svg" alt="Wi-Fi" label="Wi-Fi" sublabel="BH-1" active={toggles.wifi} onClick={handleToggle('wifi')} />
        <ComplexToggle iconSrc="/icons/bluetooth.svg" alt="Bluetooth" label="Bluetooth" active={toggles.bluetooth} onClick={handleToggle('bluetooth')} />
      </div>
      
      {/* Mode Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <ComplexToggle iconSrc="/icons/powermode.svg" alt="Power Mode" label="Power Mode" sublabel="Balanced" active={toggles.powerMode} onClick={handleToggle('powerMode')} />
        <SimpleToggle iconSrc="/icons/nightlight.svg" alt="Night Light" label="Night Light" active={toggles.nightLight} onClick={handleToggle('nightLight')} />
      </div>

      {/* Style and Airplane Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <SimpleToggle iconSrc="/icons/darkmode.svg" alt="Dark Style" label="Dark Style" active={toggles.darkStyle} onClick={handleToggle('darkStyle')} />
        <SimpleToggle iconSrc="/icons/airplane.svg" alt="Airplane Mode" label="Airplane Mode" active={toggles.airplaneMode} onClick={handleToggle('airplaneMode')} />
      </div>

    </div>
  );
}