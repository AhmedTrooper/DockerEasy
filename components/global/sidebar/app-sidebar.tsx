"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import { Atom, Box, Calendar, CircleX, Move, Settings } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import Link from "next/link";
import DockerVersion from "./docker-version";
import SidebarHeaderContent from "./sidebar-header-content";
const items = [
  {
    title: "Images",
    url: "/",
    icon: Atom,
  },
  {
    title: "Containers",
    url: "/containers",
    icon: Box,
  },
  {
    title: "Networks",
    url: "/networks",
    icon: Calendar,
  },

  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const handleApplicationClose = async () => {
    try {
      await getCurrentWindow().close();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Sidebar>
      <SidebarHeader  className="font-bold bg-blue-600">
        <SidebarHeaderContent/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-blue-600 text-3xl h-15 grid content-center">
            DockerEasy
          </SidebarGroupLabel>
          <hr />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <hr />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-red-600 grid items-start  text-white justify-items-center">
        <DockerVersion />
        <CircleX
          className="cursor-pointer"
          onClick={handleApplicationClose}
          color="white"
          width={30}
          height={30}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
