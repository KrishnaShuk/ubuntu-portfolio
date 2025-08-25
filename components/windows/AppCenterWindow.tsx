// components/windows/AppCenterWindow.tsx
'use client';

import React, { useState } from 'react';
import { FiCompass, FiStar, FiClock, FiCode, FiGrid, FiSettings, FiHelpCircle, FiSearch, FiX } from 'react-icons/fi';
import { VscVm, VscDebug } from 'react-icons/vsc';

// --- Reusable & Placeholder Components ---

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: React.ElementType, label: string, active?: boolean, onClick: () => void }) => (
  <li>
    <button onClick={onClick} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
      <Icon className="h-5 w-5" />
      <span className="font-medium text-sm">{label}</span>
    </button>
  </li>
);

// Placeholder icons for visual appeal
const MumbleIcon = () => <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black font-extrabold text-3xl">U</div>;
const KolourPaintIcon = () => <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full flex items-center justify-center text-white">🎨</div>;
const InsomniaIcon = () => <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-white"></div></div>;
const CLionIcon = () => <div className="w-16 h-16 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold text-2xl">CL</div>;
const HeyMailIcon = () => <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-3xl">👋</div>;
const SuperProductivityIcon = () => <div className="w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center text-white text-4xl">✓</div>;
const BrowserIcon = () => <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-full"></div>;
const CodeEditorIcon = () => <div className="w-16 h-16 bg-blue-800 rounded-lg text-white text-2xl font-mono flex items-center justify-center">{`</>`}</div>;


const AppCard = ({ icon: Icon, name, developer, description }: { icon: React.ElementType, name: string, developer: string, description: string }) => (
  <div className="bg-[#3a3a3a] p-4 rounded-xl flex space-x-4 hover:bg-white/5 transition-colors cursor-pointer">
    <div className="flex-shrink-0"><Icon /></div>
    <div>
      <h3 className="font-bold text-white">{name}</h3>
      <p className="text-sm text-gray-400">{developer}</p>
      <p className="text-sm text-gray-300 mt-2 line-clamp-2">{description}</p>
    </div>
  </div>
);

// --- Components for Each Section ---

const ExploreView = () => {
  const appData = [
    { icon: MumbleIcon, name: 'Mumble', developer: 'Snapcrafters', description: 'Open Source, Low Latency, High Quality Voice Chat' },
    { icon: KolourPaintIcon, name: 'kolourpaint', developer: 'KDE', description: 'Paint Program' },
    { icon: InsomniaIcon, name: 'insomnia', developer: 'Kong', description: 'API Design and Testing Platform' },
    { icon: CLionIcon, name: 'CLion', developer: 'Jetbrains', description: 'A cross-platform IDE for C and C++' },
  ];
  return (
    <>
      <div className="bg-gradient-to-br from-indigo-800 via-purple-700 to-green-600 rounded-2xl p-8 flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Featured Snaps</h2>
          <button className="mt-4 px-4 py-1.5 border border-white/50 rounded-full text-white text-sm hover:bg-white/10">Discover more</button>
        </div>
        <div className="flex space-x-2">
          <div className="w-16 h-16 bg-white/20 rounded-lg backdrop-blur-sm border border-white/20"></div>
          <div className="w-16 h-16 bg-white/20 rounded-lg backdrop-blur-sm border border-white/20"></div>
          <div className="w-16 h-16 bg-white/20 rounded-lg backdrop-blur-sm border border-white/20"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {appData.map(app => <AppCard key={app.name} {...app} />)}
      </div>
    </>
  );
};

const FeaturedView = () => {
    const featuredApps = [
        { icon: SuperProductivityIcon, name: 'Super Productivity', developer: 'johannesjo', description: 'ToDo List / Time Tracker' },
        { icon: BrowserIcon, name: 'Firefox', developer: 'Mozilla', description: 'A fast, private, and secure web browser.' },
    ];
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Editor's Picks</h2>
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-xl flex items-center space-x-6 mb-8">
                <div className="flex-shrink-0"><HeyMailIcon/></div>
                <div>
                    <h3 className="text-2xl font-bold text-white">HEY Email</h3>
                    <p className="text-white/80 mt-1">A fresh take on email that puts you back in control. Say goodbye to endless notifications.</p>
                    <button className="mt-3 px-4 py-1.5 bg-white/20 rounded-full text-white text-sm hover:bg-white/30">Learn More</button>
                </div>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Popular This Week</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {featuredApps.map(app => <AppCard key={app.name} {...app} />)}
            </div>
        </div>
    );
};

const ProductivityView = () => {
    const productivityApps = [
        { icon: HeyMailIcon, name: 'HEY Mail', developer: 'Basecamp, LLC', description: 'Email at its best, by Basecamp' },
        { icon: SuperProductivityIcon, name: 'Super Productivity', developer: 'johannesjo', description: 'ToDo List / Time Tracker / Organizer / Calendar' },
        { icon: InsomniaIcon, name: 'insomnia', developer: 'Kong', description: 'API Design and Testing Platform' },
    ];
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Get Productive</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {productivityApps.map(app => <AppCard key={app.name} {...app} />)}
            </div>
        </div>
    );
};

const DevelopmentView = () => {
    const devApps = [
        { icon: CLionIcon, name: 'CLion', developer: 'Jetbrains', description: 'A cross-platform IDE for C and C++' },
        { icon: CodeEditorIcon, name: 'VS Code', developer: 'Microsoft', description: 'Code editing. Redefined.' },
        { icon: InsomniaIcon, name: 'insomnia', developer: 'Kong', description: 'API Design and Testing Platform' },
    ];
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Development Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {devApps.map(app => <AppCard key={app.name} {...app} />)}
            </div>
        </div>
    );
};

// Generic placeholder view for other sections
const GenericSectionView = ({ title, emoji }: { title: string, emoji: string }) => (
    <div>
        <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-gray-400 text-lg">You could find exciting content here! {emoji}</p>
    </div>
);

// --- Main App Center Component ---

type Section = 'Explore' | 'Featured' | 'Productivity' | 'Development' | 'Games';

export default function AppCenterWindow() {
  const [activeSection, setActiveSection] = useState<Section>('Explore');

  const renderContent = () => {
    switch (activeSection) {
      case 'Explore': return <ExploreView />;
      case 'Featured': return <FeaturedView />;
      case 'Productivity': return <ProductivityView />;
      case 'Development': return <DevelopmentView />;
      case 'Games': return <GenericSectionView title="Games" emoji="🎮" />;
      default: return <ExploreView />;
    }
  };

  const sidebarItems: { name: Section; icon: React.ElementType }[] = [
    { name: 'Explore', icon: FiCompass }, { name: 'Featured', icon: FiStar },
    { name: 'Productivity', icon: FiClock }, { name: 'Development', icon: VscDebug },
    { name: 'Games', icon: FiGrid },
  ];

  return (
    <div className="flex h-full bg-[#303030] text-gray-300 rounded-b-lg">
      <div className="w-60 bg-[#2c2c2c] p-3 flex flex-col justify-between flex-shrink-0">
        <div>
          <h2 className="text-lg font-bold mb-4 text-white px-3">App Center</h2>
          <ul className="space-y-1">
            {sidebarItems.map(item => (
              <SidebarItem key={item.name} icon={item.icon} label={item.name} active={activeSection === item.name} onClick={() => setActiveSection(item.name)} />
            ))}
          </ul>
        </div>
        <ul> {/* Manage and About buttons */} </ul>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center p-2 border-b border-black/20 flex-shrink-0">
            <div className="relative w-1/2">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Search for apps" className="w-full bg-[#2c2c2c] border border-white/10 rounded-lg h-8 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-theme-accent" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><FiX /></button>
            </div>
        </div>
        <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}