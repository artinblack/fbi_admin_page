"use client"

import * as React from "react"
import Image from "next/image"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  FileTextIcon,
  UsersIcon,
  ChartBarIcon,
  ClipboardListIcon,
  Settings2Icon,
  CircleHelpIcon,
  PhoneIcon,
  FolderOpenIcon,
  ScrollTextIcon,
  InboxIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Admin",
    email: "vikas.usauthentication@gmail.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Orders",
      url: "#",
      icon: <ClipboardListIcon />,
    },
    {
      title: "Clients",
      url: "#",
      icon: <UsersIcon />,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <ChartBarIcon />,
    },
    {
      title: "Documents",
      url: "#",
      icon: <FileTextIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Contact Support",
      url: "#",
      icon: <PhoneIcon />,
    },
  ],
  documents: [
    {
      name: "Processing Queue",
      url: "#",
      icon: <InboxIcon />,
    },
    {
      name: "Order Templates",
      url: "#",
      icon: <ScrollTextIcon />,
    },
    {
      name: "Client Records",
      url: "#",
      icon: <FolderOpenIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5! h-auto"
              render={<a href="/dashboard" />}
            >
              <Image
                src="/logo.jpeg"
                alt="US Authentication Services"
                width={32}
                height={32}
                className="rounded-md object-contain shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-sidebar-foreground truncate">
                  US Authentication
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-sidebar-primary truncate">
                  Services
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
