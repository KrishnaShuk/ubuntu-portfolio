// components/windows/TerminalWindow.tsx
'use client';

import React, { useState, useRef } from 'react';
import Terminal from 'react-console-emulator';

// --- Type Definitions for OUR internal logic ---
// This keeps our command functions type-safe.
interface Command {
  description: string;
  fn: (...args: string[]) => string; // All our functions will return a string.
}

interface Commands {
  [key: string]: Command;
}

// --- Simulated File System (Unchanged) ---
const fileSystem = {
  '/': {
    type: 'dir',
    children: {
      'home': {
        type: 'dir',
        children: {
          'krishna': {
            type: 'dir',
            children: {
              'projects': { type: 'dir', children: {
                'portfolio.txt': { type: 'file', content: 'This very portfolio project! Built with Next.js, TypeScript, and Tailwind CSS.'}
              } },
              'documents': { type: 'dir', children: {} },
              'about.txt': { type: 'file', content: `
Hello! I'm Krishna, a passionate software developer.
I specialize in building modern, responsive, and user-friendly web applications.` },
            },
          },
        },
      },
    },
  },
};

const resolvePath = (path: string, cwd: string): string[] => {
  const newPath = path.startsWith('/') ? [] : cwd.split('/').filter(p => p);
  path.split('/').forEach(part => {
    if (part === '..') {
      newPath.pop();
    } else if (part !== '.' && part !== '') {
      newPath.push(part);
    }
  });
  return newPath;
};

const getNode = (pathArray: string[]) => {
  let currentNode: any = fileSystem['/'];
  for (const part of pathArray) {
    if (currentNode?.type === 'dir' && currentNode.children[part]) {
      currentNode = currentNode.children[part];
    } else {
      return null;
    }
  }
  return currentNode;
};


export default function TerminalWindow() {
  const [cwd, setCwd] = useState(['home', 'krishna']);
  const terminalRef = useRef<any>(null); // Use 'any' for the ref to the JS library

  // --- Command Logic (Now fully typed internally) ---
  const commands: Commands = {
    help: {
      description: 'Lists all available commands.',
      fn: () => {
        return Object.entries(commands)
          .map(([cmd, { description }]) => `${cmd.padEnd(10)} - ${description}`)
          .join('\n');
      }
    },
    whoami: {
      description: 'Displays a short bio about me.',
      fn: () => {
        return getNode(['home', 'krishna', 'about.txt'])?.content ?? 'Error: about.txt not found.';
      }
    },
    ls: {
      description: 'Lists files and directories.',
      fn: (...args: string[]) => {
        const path = args.length > 0 ? args.join(' ') : '.';
        const pathArray = resolvePath(path, cwd.join('/'));
        const node = getNode(pathArray);
        if (node && node.type === 'dir') {
          return Object.keys(node.children).map(child => {
            return node.children[child].type === 'dir' ? `\x1b[1;34m${child}/\x1b[0m` : child;
          }).join('  ');
        }
        return `ls: cannot access '${path}': No such file or directory`;
      }
    },
    cd: {
      description: 'Changes the current directory. Usage: cd <directory>',
      fn: (...args: string[]) => {
        const path = args.join(' ') || 'home/krishna';
        const newPathArray = resolvePath(path, cwd.join('/'));
        const targetNode = getNode(newPathArray);
        if (targetNode && targetNode.type === 'dir') {
          setCwd(newPathArray);
          return ''; // Successful cd has no output
        }
        return `cd: no such file or directory: ${path}`;
      }
    },
    cat: {
      description: 'Displays the content of a file. Usage: cat <file>',
      fn: (...args: string[]) => {
        const path = args.join(' ');
        if (!path) return 'cat: missing operand';
        const filePathArray = resolvePath(path, cwd.join('/'));
        const fileNode = getNode(filePathArray);
        if (fileNode && fileNode.type === 'file') {
          return fileNode.content ?? '';
        }
        return `cat: ${path}: No such file or directory`;
      }
    },
    echo: {
      description: 'Prints text to the console. Usage: echo <text>',
      fn: (...args: string[]) => args.join(' ')
    },
    clear: {
      description: 'Clears the console screen.',
      fn: () => {
        if (terminalRef.current) {
          terminalRef.current.clear();
        }
        return '';
      }
    }
  };

  const currentPath = `/${cwd.join('/') || ''}`;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white font-mono rounded-b-lg p-1 text-sm">
      <Terminal
        ref={terminalRef}
        // This 'as any' cast is the key to solving the type errors.
        // It tells TypeScript to trust our object structure for this JS-based library.
        commands={commands as any}
        noDefaults 
        welcomeMessage={"Welcome to My Portfolio Terminal! Type 'help' to see available commands."}
        promptLabel={`krishna@ubuntu:~${currentPath}$ `}
        promptLabelStyle={{ color: '#4b8501' }}
        inputStyle={{ color: '#ffffff' }}
        style={{
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}