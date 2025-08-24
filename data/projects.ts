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
    id: 'project-1',
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce website built with Next.js and Stripe for payments.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    liveUrl: 'https://live-demo.com',
    githubUrl: 'https://github.com/your-repo',
    image: '/projects/ecommerce.jpg', // Make sure to add this image
  },
  {
    id: 'project-2',
    name: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates using Firebase.',
    techStack: ['React', 'Firebase', 'Zustand', 'Vite'],
    githubUrl: 'https://github.com/your-repo-2',
    image: '/projects/task-app.jpg',
  },
  // Add more of your projects here...
];