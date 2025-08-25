// data/projects.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string; // Optional link to live demo
  githubUrl?: string; // Optional link to GitHub repo
  image: string; // Path to a screenshot in /public/projects/
}

export const projects: Project[] = [
  {
    id: 'project-0',
    name: 'Ubuntu-Portfolio',
    description: "This project is a fully interactive portfolio designed as a pixel-perfect simulation of my Ubuntu desktop environment. It's a deep dive into complex UI/UX development, creating an immersive and memorable way to explore my work through draggable windows, a functional dock, and detailed application clones, all running seamlessly in the browser.",
    techStack: ['Next.js','TypeScript','Tailwind CSS','Zustand','Framer Motion'],
    liveUrl: 'https://krishnashukla.site',
    githubUrl: 'https://github.com/your-repo',
    image: '/projects/ecommerce.jpg', 
  },
  {
    id: 'project-1',
    name: 'Pdfpod',
    description: "Pdfpod is a full-stack, intelligent document assistant designed to make dense information accessible and engaging. Users can securely upload documents and, instead of reading, ask questions to receive context-aware answers through a dynamic chat interface built on a Retrieval-Augmented Generation (RAG) pipeline.The standout feature is the ability to transform any document into a shareable, single-speaker audio summary. Leveraging a sophisticated backend, the application orchestrates a multi-step, asynchronous job that generates a script with Google's Gemini, converts it to speech with Google Cloud TTS, and stores the final podcast in the cloud. The project demonstrates a complete, modern development lifecycle, from secure user authentication to asynchronous background processing and multi-modal AI generation.",
    techStack: ['Next.js','TypeScript','Tailwind CSS','Node.js','Express.js','MongoDB','Qdrant','Redis','BullMQ','LangChain.js','Google Gemini','Google Cloud Text-to-Speech','Clerk','Zustand','Framer Motion','Cloudflare R2','Vercel','Render'],
    liveUrl: 'https://live-demo.com',
    githubUrl: 'https://github.com/your-repo',
    image: '/projects/ecommerce.jpg', 
  },
  {
    id: 'project-2',
    name: 'AI Email Template Extension',
    description: 'A production-grade Chrome extension that embeds a powerful, AI-driven assistant directly into the Gmail compose window. This tool leverages a Retrieval-Augmented Generation (RAG) pipeline to provide contextually-aware, high-quality HTML templates. It features a resilient, multi-provider backend that ensures speed and reliability by utilizing a fallback mechanism across Groq, OpenRouter, and Gemini. The frontend is a modern, modular React application built for a seamless user experience.',
    techStack: ['React','Chrome Extension SDK', 'TypeScript', 'Vite', 'Node.js', 'Vercel Serverless', 'Gemini', 'Groq', 'OpenRouter'],
    githubUrl: 'https://github.com/KrishnaShuk/EmailTempServer',
    liveUrl: 'https://chromewebstore.google.com/detail/ai-email-template-editor/anpamecmmdpglhlnkkoclhplfkkakjhf?authuser=1&hl=en-GB',
    image: '/projects/task-app.jpg',
  },
  {
    id: 'project-3',
    name: 'AI FAQ Detection Assistant',
    description: "Made an rocket chat integrated app that allows maintainers to automatically generate answers for FAQs. The app is built using the Rocket.Chat App SDK, which provides a framework for creating custom applications within the Rocket.Chat ecosystem.The app leverages the Rocket.Chat Persistent Storage to store user preferences and generated answers, ensuring that the data is retained across sessions. This allows users to access their preferences and generated answers even after closing the app.The AI FAQ Detection Assistant is designed to streamline the process of answering frequently asked questions within Rocket.Chat. By automating the generation of answers, it reduces the workload on maintainers and improves the efficiency of communication within the platform.",
    techStack: ['TypeScript', 'Node.js', 'RC App SDK', 'RC Persistent Storage'],
    githubUrl: 'https://github.com/KrishnaShuk/Faq-detection',
    liveUrl: 'https://medium.com/@shuklakrishna.kris/automating-repetitive-questions-in-rocket-chat-with-ai-building-the-faq-detection-assistant-e93b2fcb55ac',
    image: '/projects/task-app.jpg',
  },
  {
    id: 'project-4',
    name: 'Tamally Landing Page',
    description: 'Currently building this landing page for AI Email Template Generator Chrome Extension. This will act as a funnel to let users download the extension',
    techStack: ['Typescript', 'Next.js', 'Tailwind CSS', 'Framer', 'Vanta.js'],
    githubUrl: 'https://github.com/KrishnaShuk/Tamally',
    liveUrl: 'https://www.tamally.site/',
    image: '/projects/task-app.jpg',
  },
  {
    id: 'project-5',
    name: 'Agilitas',
    description: "This project is a visually-driven landing page that translates a high-fidelity Figma design into a fully responsive web experience for the Agilitas brand. The core challenge was to implement modern UI techniques, including a glassmorphism navigation bar and dynamic, skewed image grids, to create an engaging and elegant digital presence. Key features include the pixel-perfect development from a complex design, a floating semi-transparent navbar, and a responsive layout that ensures a seamless user experience across all devices.",
    techStack: ['Typescript', 'Next.js', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion'],
    githubUrl: 'https://github.com/KrishnaShuk/agilitas',
    liveUrl: 'https://agilitas-psi.vercel.app/',
    image: '/projects/task-app.jpg',
  },
  {
    id: 'project-6',
    name: 'Deepseek',
    description: 'This project incorporates all the UI/UX features from the Deepseek app and is built using Next.js, TypeScript, and Tailwind CSS, showcasing my skills in modern web development. It uses Clerk authentication for secure login and signup, implements token-by-token streaming of prompt outputs for an enhanced user experience, and allows users to save their prompts and chat history. MongoDB is used for storing user data, chat history, and application settings.',
    techStack: ['Javascript', 'Next.js', 'MongoDB', 'Express.js', 'Redux', 'Clerk'],
    githubUrl: 'https://github.com/KrishnaShuk/llmchatapp',
    liveUrl: 'https://llmchatapp-seven.vercel.app/',
    image: '/projects/task-app.jpg',
  },
  {
    id: 'project-7',
    name: 'VedaHelp',
    description: 'I developed a Doctor-Patient interface web application that enables patients to book appointments and receive ayurvedic prescriptions online. Built using React, Node.js, and MongoDB, it showcases my full-stack development skills while ensuring secure authentication and authorization with Clerk. The platform features a user-friendly interface for both doctors and patients, supports appointment scheduling and management, allows doctors to search for patients and view their profiles, and even enables prescription generation through nail and face image analysis.',
    techStack: ['Javascript', 'MongoDB', 'Node.js', 'Clerk'],
    githubUrl: 'https://github.com/KrishnaShuk/VedaHelp',
    liveUrl: 'https://vedahelp.netlify.app/',
    image: '/projects/task-app.jpg',
  },
  {
    id: 'project-8',
    name: 'Finance Tracker',
    description: "The 'Finance Tracker' project is a personal web application designed to help users manage their finances effectively. Built using React, Node.js, and Firebase, this application provides a user-friendly interface for tracking income, expenses, and savings.Firebase is utilized for secure data storage and real-time synchronization, ensuring that users can access their financial data from any device.",
    techStack: ['Javascript', 'React', 'FireBase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/KrishnaShuk/Finance-Tool',
    liveUrl: 'https://finance-trac.netlify.app/',
    image: '/projects/task-app.jpg',
  }
];