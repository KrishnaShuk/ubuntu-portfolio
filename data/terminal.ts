import * as React from "react";

export interface TerminalData {
  id: string;
  title: string;
  type: "folder" | "file";
  children?: TerminalData[];
  content?: string | React.JSX.Element;
}

export const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: `
Hello! I'm Krishna, a passionate software developer.
I specialize in building modern, responsive, and user-friendly web applications.
This portfolio is a testament to my love for building immersive digital experiences.
`
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: `
Email: example@email.com
Github: @your-github
LinkedIn: /in/your-linkedin
`
      }
    ]
  },
  {
    id: "projects",
    title: "projects",
    type: "folder",
    children: [
        {
            id: "project-portfolio",
            title: "ubuntu-portfolio.txt",
            type: "file",
            content: "This very portfolio project! Built with Next.js, TypeScript, and Tailwind CSS to simulate a fully interactive Ubuntu desktop environment."
        }
    ]
  },
  {
    id: "readme",
    title: "README.md",
    type: "file",
    content: "Welcome to my portfolio terminal! Type 'help' to see a list of available commands."
  }
];