// app/page.tsx
import Desktop from "@/components/desktop/Desktop";
import Dock from "@/components/desktop/Dock";
import TopBar from "@/components/desktop/TopBar";

export default function Home() {
  return (
    // CHANGED: The background image is now on the top-level container
    <main 
      className="h-screen w-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url(/wallpaper.jpg)" }}
    >
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Dock />
        <Desktop />
      </div>
    </main>
  );
}