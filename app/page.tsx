// app/page.tsx
import Desktop from "@/components/desktop/Desktop";
import Dock from "@/components/desktop/Dock";
import TopBar from "@/components/desktop/TopBar";
import ProjectsWindowServer from "@/components/windows/ProjectsWindowServer";
import ChromeWindow from "@/components/windows/ChromeWindow";
import VSCodeServer from "@/components/windows/VSCodeServer";
import AppCenterWindow from "@/components/windows/AppCenterWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import AboutPortfolioWindow from "@/components/windows/AboutPortfolioWindow";

export default function Home() {
  const appContents = {
    'files': <ProjectsWindowServer />,
    'chrome': <ChromeWindow />,
    'vscode': <VSCodeServer />,
    'terminal': <TerminalWindow />,
    'appstore': <AppCenterWindow />,
    'about-portfolio': <AboutPortfolioWindow />,
  };
  return (
    <main className="h-screen w-screen bg-black relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/live-wallpaper.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 h-full w-full flex flex-col">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          {/* Pass the pre-rendered content down to the client */}
          <Dock appContents={appContents} />
          <Desktop appContents={appContents} />
        </div>
      </div>
    </main>
  );
}