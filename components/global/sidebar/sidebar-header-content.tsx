"use client";
import { LucideMinimize2, MaximizeIcon, Minus, Move } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState } from "react";

export default function SidebarHeaderContent() {
  const [unMaximized, setUnmaximized] = useState<boolean | null>(null);

  const dragWindowHandle = async () => {
    try {
      await getCurrentWindow().startDragging();
    } catch (e) {
      console.log(e);
    }
  };

  const handleMaximizeUnmaximize = async () => {
    try {
      let isCurrentWindowMaximized = await getCurrentWindow().isMaximized();
      if (!isCurrentWindowMaximized) {
        setUnmaximized(true);
        await getCurrentWindow().maximize();
        await getCurrentWindow().setFullscreen(true);
      } else {
        setUnmaximized(false);
        await getCurrentWindow().setFullscreen(false);
        await getCurrentWindow().unmaximize();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMinimize = async () => {
    try {
      await getCurrentWindow().minimize();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="grid grid-cols-3 content-center items-centent">
      <div
        className="cursor-pointer text-white"
        onClick={handleMaximizeUnmaximize}
      >
        {unMaximized ? <LucideMinimize2 /> : <MaximizeIcon />}
      </div>
      <div onClick={handleMinimize} className="cursor-pointer text-white">
        <Minus />
      </div>
      <div onMouseDown={dragWindowHandle} className="cursor-pointer text-white">
        <Move />
      </div>
    </div>
  );
}
