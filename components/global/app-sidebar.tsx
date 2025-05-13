"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Atom, Box, Calendar, CircleX, Cross, Home, Inbox, Search, Settings } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
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
]

export default function AppSidebar(){
  const handleApplicationClose = async () =>{
try{
 await getCurrentWindow().close();
} catch(e){
console.log(e)
}
  }
    return(
         <Sidebar>
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                    
                  </SidebarMenuButton>
                  <hr />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-red-600 grid items-start  text-white justify-items-center">
        <CircleX className="cursor-pointer" onClick={handleApplicationClose} color="white" width={30} height={30}/>
      </SidebarFooter>
    </Sidebar>
    );
}