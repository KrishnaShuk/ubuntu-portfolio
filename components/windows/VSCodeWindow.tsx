'use client'

import React from 'react';
import { FiFolder, FiFile, FiSearch, FiGitBranch, FiX, FiAlertCircle, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { VscExtensions, VscDebugAlt, VscAccount, VscSettingsGear } from 'react-icons/vsc';

// Syntax highlighted sample code
const SyntaxHighlightedCode = () => (
  <div className="text-sm leading-6">
    <div className="flex">
      <div className="w-12 text-right pr-4 text-gray-500 select-none">
        {Array.from({length: 25}, (_, i) => (
          <div key={i + 1} className="h-6">{i + 1}</div>
        ))}
      </div>
      <div className="flex-1">
        <div className="text-blue-400">import</div>
        <span className="text-gray-300"> {'{ '}</span>
        <span className="text-cyan-300">promises</span>
        <span className="text-blue-400"> as </span>
        <span className="text-cyan-300">fs</span>
        <span className="text-gray-300"> {'} '}</span>
        <span className="text-blue-400">from </span>
        <span className="text-green-400">'fs'</span>
        <span className="text-gray-300">;</span>
        <br />

        <div className="text-blue-400">import</div>
        <span className="text-cyan-300"> path </span>
        <span className="text-blue-400">from </span>
        <span className="text-green-400">'path'</span>
        <span className="text-gray-300">;</span>
        <br />

        <div className="text-blue-400">import</div>
        <span className="text-yellow-300"> ProjectsWindowClient </span>
        <span className="text-blue-400">from </span>
        <span className="text-green-400">'./ProjectsWindowClient'</span>
        <span className="text-gray-300">;</span>
        <br /><br />

        <span className="text-gray-500">// This is a Server Component (no 'use client')</span>
        <br />

        <span className="text-blue-400">export default async function </span>
        <span className="text-yellow-300">ProjectsWindowServer</span>
        <span className="text-gray-300">() {'{'}</span>
        <br />

        <span className="text-blue-400">  const </span>
        <span className="text-cyan-300">dataPath </span>
        <span className="text-gray-300">= </span>
        <span className="text-cyan-300">path</span>
        <span className="text-gray-300">.</span>
        <span className="text-yellow-300">join</span>
        <span className="text-gray-300">(</span>
        <span className="text-cyan-300">process</span>
        <span className="text-gray-300">.</span>
        <span className="text-cyan-300">cwd</span>
        <span className="text-gray-300">(), </span>
        <span className="text-green-400">'data'</span>
        <span className="text-gray-300">, </span>
        <span className="text-green-400">'mydata'</span>
        <span className="text-gray-300">);</span>
        <br /><br />

        <span className="text-pink-400">  try </span>
        <span className="text-gray-300">{'{'}</span>
        <br />

        <span className="text-blue-400">    const </span>
        <span className="text-gray-300">[</span>
        <span className="text-cyan-300">about</span>
        <span className="text-gray-300">, </span>
        <span className="text-cyan-300">projects</span>
        <span className="text-gray-300">] = </span>
        <span className="text-blue-400">await </span>
        <span className="text-yellow-300">Promise</span>
        <span className="text-gray-300">.</span>
        <span className="text-yellow-300">all</span>
        <span className="text-gray-300">([</span>
        <br />

        <span className="text-cyan-300">      fs</span>
        <span className="text-gray-300">.</span>
        <span className="text-yellow-300">readFile</span>
        <span className="text-gray-300">(</span>
        <span className="text-cyan-300">path</span>
        <span className="text-gray-300">.</span>
        <span className="text-yellow-300">join</span>
        <span className="text-gray-300">(</span>
        <span className="text-cyan-300">dataPath</span>
        <span className="text-gray-300">, </span>
        <span className="text-green-400">'about.md'</span>
        <span className="text-gray-300">), </span>
        <span className="text-green-400">'utf8'</span>
        <span className="text-gray-300">),</span>
        <br />

        <span className="text-cyan-300">      fs</span>
        <span className="text-gray-300">.</span>
        <span className="text-yellow-300">readFile</span>
        <span className="text-gray-300">(</span>
        <span className="text-cyan-300">path</span>
        <span className="text-gray-300">.</span>
        <span className="text-yellow-300">join</span>
        <span className="text-gray-300">(</span>
        <span className="text-cyan-300">dataPath</span>
        <span className="text-gray-300">, </span>
        <span className="text-green-400">'projects.md'</span>
        <span className="text-gray-300">), </span>
        <span className="text-green-400">'utf8'</span>
        <span className="text-gray-300">),</span>
        <br />

        <span className="text-gray-300">    ]);</span>
        <br /><br />

        <span className="text-blue-400">    const </span>
        <span className="text-cyan-300">allContent </span>
        <span className="text-gray-300">= {'{'}</span>
        <br />

        <span className="text-green-400">      'About Me'</span>
        <span className="text-gray-300">: </span>
        <span className="text-cyan-300">about</span>
        <span className="text-gray-300">,</span>
        <br />

        <span className="text-green-400">      'Projects'</span>
        <span className="text-gray-300">: </span>
        <span className="text-cyan-300">projects</span>
        <span className="text-gray-300">,</span>
        <br />

        <span className="text-gray-300">    {'}'};</span>
        <br /><br />

        <span className="text-pink-400">    return </span>
        <span className="text-gray-300">{'<'}</span>
        <span className="text-red-400">ProjectsWindowClient</span>
        <span className="text-cyan-300"> initialContent</span>
        <span className="text-gray-300">={'{'}</span>
        <span className="text-cyan-300">allContent</span>
        <span className="text-gray-300">{'}'} /&gt;</span>
        <br /><br />

        <span className="text-gray-300">  {'}'} </span>
        <span className="text-pink-400">catch </span>
        <span className="text-gray-300">(</span>
        <span className="text-cyan-300">error</span>
        <span className="text-gray-300">) {'{'}</span>
        <br />

        <span className="text-cyan-300">    console</span>
        <span className="text-gray-300">.</span>
        <span className="text-yellow-300">error</span>
        <span className="text-gray-300">(</span>
        <span className="text-green-400">"Failed to read project files:"</span>
        <span className="text-gray-300">, </span>
        <span className="text-cyan-300">error</span>
        <span className="text-gray-300">);</span>
        <br />

        <span className="text-pink-400">    return </span>
        <span className="text-gray-300">{'<'}</span>
        <span className="text-red-400">div</span>
        <span className="text-cyan-300"> className</span>
        <span className="text-gray-300">=</span>
        <span className="text-green-400">"p-4 text-red-500"</span>
        <span className="text-gray-300">{'>'}</span>
        <span className="text-white">Error: Could not load content.</span>
        <span className="text-gray-300">{'</'}</span>
        <span className="text-red-400">div</span>
        <span className="text-gray-300">{'>'};</span>
        <br />

        <span className="text-gray-300">  {'}'}</span>
        <br />

        <span className="text-gray-300">{'}'}</span>
      </div>
    </div>
  </div>
);

// Enhanced File Tree Item with proper icons and expand/collapse
const FileTreeItem = ({ 
  name, 
  icon: Icon, 
  level = 0, 
  isFolder = false, 
  expanded = true,
  hasChildren = false,
  isActive = false 
}) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);
  
  return (
    <div 
      className={`flex items-center text-sm py-0.5 px-1 cursor-pointer hover:bg-[#2a2d2e] ${isActive ? 'bg-[#37373d]' : ''}`} 
      style={{ paddingLeft: `${level * 16 + 8}px` }}
      onClick={() => isFolder && setIsExpanded(!isExpanded)}
    >
      {hasChildren && (
        <div className="w-4 flex justify-center">
          {isExpanded ? <FiChevronDown size={12} /> : <FiChevronRight size={12} />}
        </div>
      )}
      {!hasChildren && <div className="w-4" />}
      <Icon 
        className={`mr-2 flex-shrink-0 ${
          isFolder ? 'text-blue-400' : 
          name.endsWith('.tsx') || name.endsWith('.ts') ? 'text-blue-400' :
          name.endsWith('.md') ? 'text-yellow-400' :
          'text-gray-400'
        }`} 
        size={16} 
      />
      <span className={isActive ? 'text-white' : 'text-gray-300'}>{name}</span>
    </div>
  );
};

// Enhanced Tab component
const Tab = ({ name, active = false, isDirty = false, onClose }) => (
  <div className={`flex items-center px-3 py-2 text-sm cursor-pointer border-r border-[#252526] min-w-0 ${
    active ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#1e1e1e]'
  }`}>
    <FiFile className={`mr-2 flex-shrink-0 ${
      name.endsWith('.tsx') || name.endsWith('.ts') ? 'text-blue-400' :
      name.endsWith('.md') ? 'text-yellow-400' :
      'text-gray-400'
    }`} size={16} />
    <span className="truncate mr-2">{name}</span>
    {isDirty && <div className="w-2 h-2 bg-white rounded-full mr-1" />}
    <FiX 
      className="text-gray-500 hover:text-white hover:bg-[#424242] rounded p-0.5" 
      size={16}
      onClick={(e) => {
        e.stopPropagation();
        onClose?.();
      }}
    />
  </div>
);

export default function VSCodeWindow() {
  const [activeTab, setActiveTab] = React.useState('ProjectsWindowServer.tsx');
  const [tabs, setTabs] = React.useState([
    { name: 'ProjectsWindowServer.tsx', isDirty: false },
    { name: 'page.tsx', isDirty: true },
    { name: 'Window.tsx', isDirty: false }
  ]);

  return (
    <div className="flex h-full bg-[#1e1e1e] text-gray-300 font-mono rounded-b-lg overflow-hidden border-l border-r border-b border-[#464647]">
      
      {/* Activity Bar */}
      <div className="w-12 bg-[#333333] flex flex-col items-center justify-between py-3 border-r border-[#464647]">
        <div className="flex flex-col items-center space-y-6">
          <button className="relative group">
            <FiFile size={24} className="text-white" />
            <div className="absolute left-0 top-0 w-0.5 h-6 bg-white" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FiSearch size={24} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FiGitBranch size={24} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <VscDebugAlt size={24} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <VscExtensions size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <VscAccount size={24} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <VscSettingsGear size={24} />
          </button>
        </div>
      </div>

      {/* Side Bar */}
      <div className="w-64 bg-[#252526] flex flex-col border-r border-[#464647]">
        <div className="px-4 py-2 text-xs uppercase text-gray-500 font-semibold bg-[#2c2c2c] border-b border-[#464647]">
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="py-1">
            <FileTreeItem 
              name="PORTFOLIO" 
              icon={FiFolder} 
              isFolder={true} 
              hasChildren={true}
              expanded={true}
            />
            <FileTreeItem 
              name="components" 
              icon={FiFolder} 
              level={1} 
              isFolder={true} 
              hasChildren={true}
              expanded={true}
            />
            <FileTreeItem 
              name="desktop" 
              icon={FiFolder} 
              level={2} 
              isFolder={true} 
              hasChildren={true}
            />
            <FileTreeItem 
              name="Dock.tsx" 
              icon={FiFile} 
              level={3} 
            />
            <FileTreeItem 
              name="windows" 
              icon={FiFolder} 
              level={2} 
              isFolder={true} 
              hasChildren={true}
              expanded={true}
            />
            <FileTreeItem 
              name="ProjectsWindowServer.tsx" 
              icon={FiFile} 
              level={3} 
              isActive={activeTab === 'ProjectsWindowServer.tsx'}
            />
            <FileTreeItem 
              name="ProjectsWindowClient.tsx" 
              icon={FiFile} 
              level={3} 
            />
            <FileTreeItem 
              name="VSCodeWindow.tsx" 
              icon={FiFile} 
              level={3} 
            />
            <FileTreeItem 
              name="data" 
              icon={FiFolder} 
              level={1} 
              isFolder={true} 
              hasChildren={true}
              expanded={true}
            />
            <FileTreeItem 
              name="mydata" 
              icon={FiFolder} 
              level={2} 
              isFolder={true} 
              hasChildren={true}
            />
            <FileTreeItem 
              name="about.md" 
              icon={FiFile} 
              level={3} 
            />
            <FileTreeItem 
              name="projects.md" 
              icon={FiFile} 
              level={3} 
            />
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Tab Bar */}
        <div className="flex bg-[#2d2d2d] border-b border-[#252526] overflow-x-auto">
          {tabs.map((tab) => (
            <Tab 
              key={tab.name}
              name={tab.name} 
              active={activeTab === tab.name}
              isDirty={tab.isDirty}
              onClose={() => {
                setTabs(tabs.filter(t => t.name !== tab.name));
                if (activeTab === tab.name) {
                  setActiveTab(tabs.find(t => t.name !== tab.name)?.name || '');
                }
              }}
            />
          ))}
        </div>

        {/* Editor Content */}
        <div className="flex-1 bg-[#1e1e1e] overflow-auto">
          <div className="p-4">
            <SyntaxHighlightedCode />
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-4 text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FiGitBranch size={12} />
              <span>main</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>↻</span>
              <span>0</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiX size={12} />
              <span>0</span>
              <FiAlertCircle size={12} />
              <span>0</span>
            </div>
            <span>Ln 15, Col 27</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span>TypeScript JSX</span>
          </div>
        </div>
      </div>
    </div>
  );
}