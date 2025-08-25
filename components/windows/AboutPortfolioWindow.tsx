// components/windows/AboutPortfolioWindow.tsx
import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

// This is a Server Component that fetches its own data
export default async function AboutPortfolioWindow() {
  const dataPath = path.join(process.cwd(), 'data', 'mydata', 'about-portfolio.md');
  let content = "Error: Could not load content for this window.";

  try {
    content = await fs.readFile(dataPath, 'utf8');
  } catch (error) {
    console.error("Failed to read about-portfolio.md:", error);
  }

  return (
    <div className="h-full bg-[#303030] text-text-light rounded-b-lg p-8 overflow-y-auto scrollbar-hide">
      <article className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}