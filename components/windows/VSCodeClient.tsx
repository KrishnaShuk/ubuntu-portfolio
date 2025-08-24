// components/windows/VSCodeClient.tsx
'use client';

import { useState } from 'react';
import { FiFolder, FiFile, FiX } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import { clsx } from 'clsx';

interface VSCodeClientProps {
  initialFiles: { [key: string]: string };
}

// Simulated file tree structure
const fileTree = [
  { name: 'components', children: [
    { name: 'desktop', children: [{ name: 'Dock.tsx' }, { name: 'TopBar.tsx' }] },
    { name: 'windows', children: [{ name: 'Window.tsx' }, { name: 'ChromeWindow.tsx' }] },
  ]},
  { name: 'data', children: [
    { name: 'mydata', children: [{ name: 'about.me.md' }, { name: 'projects.md' }] }
  ]},
  { name: 'app', children: [{ name: 'page.tsx' }] },
];

export default function VSCodeClient({ initialFiles }: VSCodeClientProps) {
  const [openFiles, setOpenFiles] = useState<string[]>(['about.me.md']);
  const [activeFile, setActiveFile] = useState<string>('about.me.md');
  const [fileContents, setFileContents] = useState(initialFiles);

  const handleFileClick = (fileName: string) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles([...openFiles, fileName]);
    }
    setActiveFile(fileName);
  };

  const handleCloseFile = (fileName: string) => {
    const fileIndex = openFiles.indexOf(fileName);
    const newOpenFiles = openFiles.filter(f => f !== fileName);
    if (activeFile === fileName) {
      const newActiveIndex = Math.max(0, fileIndex - 1);
      setActiveFile(newOpenFiles[newActiveIndex]);
    }
    setOpenFiles(newOpenFiles);
  };

  const isMarkdown = activeFile?.endsWith('.md');
  const activeContent = fileContents[activeFile] || '';

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-300 font-mono rounded-b-lg">
      {/* Editor Group Tabs */}
      <div className="flex bg-[#252526]">
        {openFiles.map(file => (
          <div key={file} onClick={() => setActiveFile(file)}
            className={clsx("flex items-center p-2 text-sm cursor-pointer border-r border-[#2d2d2d]",
            activeFile === file ? 'bg-[#1e1e1e] border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] hover:bg-[#3e3e3e]')}
          >
            <FiFile className="mr-2" />
            <span>{file}</span>
            <button onClick={(e) => { e.stopPropagation(); handleCloseFile(file); }} className="ml-3 p-1 rounded hover:bg-white/10"><FiX size={12} /></button>
          </div>
        ))}
      </div>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Side Bar */}
        <div className="w-64 bg-[#252526] p-2 overflow-y-auto">
          <h2 className="text-xs uppercase text-gray-400 font-bold mb-2">Explorer</h2>
          {/* Recursive component to render file tree */}
          <FileTree items={fileTree} onFileClick={handleFileClick} />
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex overflow-hidden">
          {isMarkdown ? (
            <>
              <textarea
                value={activeContent}
                onChange={(e) => setFileContents({...fileContents, [activeFile]: e.target.value})}
                className="w-1/2 h-full bg-[#1e1e1e] p-4 focus:outline-none resize-none"
              />
              <div className="w-1/2 h-full bg-white text-black p-4 overflow-y-auto">
                <article className="prose">
                  <ReactMarkdown>{activeContent}</ReactMarkdown>
                </article>
              </div>
            </>
          ) : (
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} showLineNumbers customStyle={{ width: '100%', backgroundColor: '#1e1e1e' }}>
              {activeContent}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-4 text-xs">
        <span>main*</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}

// A simple recursive component to display the file tree
const FileTree = ({ items, onFileClick, level = 0 }: any) => (
  <ul>
    {items.map((item: any) => (
      <li key={item.name} style={{ paddingLeft: `${level * 16}px` }}>
        {item.children ? (
          <>
            <div className="flex items-center text-sm"><FiFolder className="mr-2" /> {item.name}</div>
            <FileTree items={item.children} onFileClick={onFileClick} level={level + 1} />
          </>
        ) : (
          <button onClick={() => onFileClick(item.name)} className="flex items-center text-sm hover:bg-white/10 w-full rounded p-1">
            <FiFile className="mr-2" /> {item.name}
          </button>
        )}
      </li>
    ))}
  </ul>
);