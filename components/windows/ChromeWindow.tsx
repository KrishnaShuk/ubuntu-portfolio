'use client';

import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiRotateCw, FiHome, FiLock, FiStar, FiPlus, FiX } from 'react-icons/fi';
import { clsx } from 'clsx';
import Image from 'next/image';

interface Tab {
  id: number;
  title: string;
  url: string;
  favicon: string;
}

const DEFAULT_URL = 'https://www.google.com/webhp?igu=1'; 

export default function ChromeWindow() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: 'New Tab', url: DEFAULT_URL, favicon: '/icons/chrome.svg' },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [inputValue, setInputValue] = useState(DEFAULT_URL);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  // --- HANDLERS ---
  const handleNewTab = () => {
    const newId = Date.now();
    const newTab: Tab = {
      id: newId,
      title: 'New Tab',
      url: DEFAULT_URL,
      favicon: '/icons/chrome.svg'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setInputValue(DEFAULT_URL);
  };

  const handleCloseTab = (tabId: number) => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    const newTabs = tabs.filter(tab => tab.id !== tabId);

    if (newTabs.length === 0) {
      // Create a new default tab if the last one is closed
      const newId = Date.now();
      const newTab: Tab = { id: newId, title: 'New Tab', url: DEFAULT_URL, favicon: '/icons/google.svg' };
      setTabs([newTab]);
      setActiveTabId(newId);
      setInputValue(DEFAULT_URL);
      return;
    }

    if (activeTabId === tabId) {
      // If closing the active tab, activate the one to the left, or the first one
      const newActiveIndex = Math.max(0, tabIndex - 1);
      setActiveTabId(newTabs[newActiveIndex].id);
      setInputValue(newTabs[newActiveIndex].url);
    }
    setTabs(newTabs);
  };

  const handleTabClick = (tabId: number) => {
    setActiveTabId(tabId);
    const clickedTab = tabs.find(tab => tab.id === tabId);
    if (clickedTab) {
      setInputValue(clickedTab.url);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = inputValue;
    if (!url.startsWith('http')) {
      url = `https://` + url;
    }
    setTabs(tabs.map(tab => tab.id === activeTabId ? { ...tab, url, title: url.split('/')[2] } : tab));
  };


  return (
    <div className="flex flex-col h-full bg-[#35363a] text-white rounded-b-lg">
      {/* Tab Bar */}
      <div className="h-10 bg-[#202124] flex items-end">
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={clsx(
              "flex items-center h-[36px] px-3 pt-1 relative cursor-pointer group",
              activeTabId === tab.id 
                ? "bg-[#35363a] rounded-t-lg" 
                : "hover:bg-white/5 rounded-t-lg"
            )}
          >
            <Image src={tab.favicon} alt="favicon" width={16} height={16} className="mr-2" />
            <span className="text-xs truncate max-w-[150px]">{tab.title}</span>
            <button onClick={(e) => { e.stopPropagation(); handleCloseTab(tab.id); }} className="ml-3 p-1 rounded-full hover:bg-white/10 group-hover:opacity-100 opacity-0">
              <FiX size={12} />
            </button>
          </div>
        ))}
        <button onClick={handleNewTab} className="p-2 m-1 rounded-full hover:bg-white/10">
          <FiPlus size={16} />
        </button>
      </div>

      {/* Address Bar */}
      <div className="h-12 bg-[#35363a] flex items-center px-2 space-x-2">
        <button className="p-2 rounded-full hover:bg-white/10"><FiArrowLeft /></button>
        <button className="p-2 rounded-full hover:bg-white/10"><FiArrowRight /></button>
        <button className="p-2 rounded-full hover:bg-white/10"><FiRotateCw /></button>
        <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center bg-[#202124] rounded-full h-8 px-3">
          <FiLock size={14} className="text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-200 px-2 focus:outline-none"
          />
          <button type="submit" className="p-1 rounded-full hover:bg-white/10"><FiStar /></button>
        </form>
      </div>

      {/* Web Content */}
      <div className="flex-1 bg-white">
        {activeTab && (
          <iframe
            src={activeTab.url}
            className="w-full h-full border-none"
            title={activeTab.title}
            sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        )}
      </div>
    </div>
  );
}