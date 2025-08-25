// components/windows/TerminalWindow.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';
// --- CHANGED: Import from the new location in the 'data' folder ---
import { terminal as fileSystemConfig, TerminalData } from '@/data/terminal';

export default function TerminalWindow() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);
  
  useEffect(() => {
    setOutput([
      <div key="welcome">Welcome! Type <span className="text-yellow-300">'help'</span> to get started.</div>
    ]);
  }, []);

  const getCurrentChildren = (): TerminalData[] => {
    let children = fileSystemConfig;
    for (const part of currentPath) {
      const dir = children.find(item => item.title === part && item.type === 'folder');
      if (dir && dir.children) {
        children = dir.children;
      } else {
        return [];
      }
    }
    return children;
  };

  const processCommand = (command: string) => {
    const [cmd, ...args] = command.trim().split(' ');
    const argString = args.join(' ');
    const currentChildren = getCurrentChildren();
    
    let newOutput: React.ReactNode = `Command not found: ${cmd}. Type 'help'.`;

    if (cmd === 'help') {
      newOutput = (
        <ul className="list-inside list-disc">
          <li><span className="text-yellow-300">ls</span> - List files and directories</li>
          <li><span className="text-yellow-300">cd &lt;dir&gt;</span> - Change directory ('..' for parent, '~' for root)</li>
          <li><span className="text-yellow-300">cat &lt;file&gt;</span> - Read file content</li>
          <li><span className="text-yellow-300">clear</span> - Clear the terminal</li>
        </ul>
      );
    } else if (cmd === 'ls') {
      if (currentChildren.length > 0) {
        newOutput = (
          <div className="flex flex-wrap gap-x-6">
            {currentChildren.map(child => (
              <span key={child.id} className={child.type === 'folder' ? 'text-blue-400' : 'text-white'}>
                {child.title}
              </span>
            ))}
          </div>
        );
      } else {
        newOutput = null; // Empty directory, show nothing
      }
    } else if (cmd === 'cd') {
      if (!argString || argString === '~') {
        setCurrentPath([]);
        newOutput = null;
      } else if (argString === '..') {
        setCurrentPath(prev => prev.slice(0, -1));
        newOutput = null;
      } else {
        const targetDir = currentChildren.find(item => item.title === argString && item.type === 'folder');
        if (targetDir) {
          setCurrentPath(prev => [...prev, argString]);
          newOutput = null;
        } else {
          newOutput = `cd: no such file or directory: ${argString}`;
        }
      }
    } else if (cmd === 'cat') {
      const targetFile = currentChildren.find(item => item.title === argString && item.type === 'file');
      if (targetFile) {
        newOutput = <pre className="whitespace-pre-wrap">{targetFile.content}</pre>;
      } else {
        newOutput = `cat: ${argString}: No such file or directory`;
      }
    } else if (cmd === 'clear') {
      setOutput([]);
      return;
    }

    const pathString = currentPath.length > 0 ? `~/${currentPath.join('/')}` : '~';
    const prompt = <Prompt path={pathString} />;
    setOutput(prev => [...prev, <div key={prev.length}>{prompt}{command}</div>, newOutput && <div key={prev.length + 1}>{newOutput}</div>]);
    setHistory(prev => [command, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const Prompt = ({ path }: { path: string }) => (
    <span className="flex-shrink-0">
      <span className="text-green-400">krishna@krishna-inspiron-15-3511</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">{path}</span>
      <span className="text-white">$ </span>
    </span>
  );

  const pathString = currentPath.length > 0 ? `~/${currentPath.join('/')}` : '~';

  return (
    <div className="flex flex-col h-full bg-[#2E0329] text-white/90 font-mono rounded-b-lg text-sm" onClick={() => inputRef.current?.focus()}>
      <div className="h-8 bg-[#1f1f1f] flex items-center justify-between px-2 flex-shrink-0 border-b border-black/30">
        <span className="pl-1">krishna@krishna-inspiron-15-3511</span>
        <div className="flex items-center space-x-2">
            <button className="p-1 rounded hover:bg-white/10"><FiSearch size={14}/></button>
            <button className="p-1 rounded hover:bg-white/10"><FiMenu size={14}/></button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-2 overflow-y-auto">
        {output}
        <div className="flex">
          <Prompt path={pathString} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent focus:outline-none"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}