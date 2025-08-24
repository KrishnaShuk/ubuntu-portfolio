// components/windows/VSCodeServer.tsx
import { promises as fs } from 'fs';
import path from 'path';
import VSCodeClient from './VSCodeClient';

// A simple, secure function to read a file's content
// It is properly typed to return a Promise that resolves to a string.
async function getFileContent(filePath: string): Promise<string> {
  try {
    // We construct an absolute path from the project root
    const absolutePath = path.join(process.cwd(), filePath);
    const content = await fs.readFile(absolutePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Could not read file: ${filePath}`, error);
    // Return a user-friendly error message if the file is not found
    return `// Error: Could not load file content for ${filePath}.`;
  }
}

// This is our main Server Component
export default async function VSCodeServer() {
  // We fetch the content of some key files to pre-load the editor.
  // Using Promise.all is efficient as it fetches them in parallel.
  const initialFiles = {
    'about.me.md': await getFileContent('data/mydata/about.md'),
    'Dock.tsx': await getFileContent('components/desktop/Dock.tsx'),
    'Window.tsx': await getFileContent('components/windows/Window.tsx'),
    'page.tsx': await getFileContent('app/page.tsx'),
    'projects.md': await getFileContent('data/mydata/projects.md'),
  };

  // We pass the fetched file contents as a prop to our Client Component.
  return <VSCodeClient initialFiles={initialFiles} />;
}