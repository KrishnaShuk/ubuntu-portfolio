export default function TopBar() {
  return (
    <div className="h-6 bg-top-bar flex items-center justify-between px-4 text-sm z-50 flex-shrink-0">
      <div className="font-medium">Activities</div>
      <div>Aug 23 12:46</div> {/* We'll make this dynamic later */}
      <div className="flex items-center space-x-3">
        {/* Placeholders for system tray icons */}
        <div>Wi-Fi</div>
        <div>Vol</div>
        <div>Pwr</div>
      </div>
    </div>
  );
}