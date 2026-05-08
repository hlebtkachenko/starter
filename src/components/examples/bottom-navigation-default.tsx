/**
 * @slug bottom-navigation
 * @variant default
 * @upstream https://shark.vini.one/docs/components/bottom-navigation
 * @deviations ["Fixed position removed for showcase preview."]
 */
"use client";

import { Home, MessageCircle, Search, Settings, User } from "lucide-react";

import {
  BottomNavigation,
  BottomNavigationItem,
  BottomNavigationItemIcon,
  BottomNavigationItemLabel,
  BottomNavigationList,
} from "@/components/ui/bottom-navigation";

export default function BottomNavigationDefault() {
  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg border bg-background">
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Mobile app content area
      </div>
      <BottomNavigation defaultValue="home">
        <BottomNavigationList className="static border-t" aria-label="App navigation">
          <BottomNavigationItem value="home" aria-label="Home">
            <BottomNavigationItemIcon>
              <Home />
            </BottomNavigationItemIcon>
            <BottomNavigationItemLabel>Home</BottomNavigationItemLabel>
          </BottomNavigationItem>
          <BottomNavigationItem value="search" aria-label="Search">
            <BottomNavigationItemIcon>
              <Search />
            </BottomNavigationItemIcon>
            <BottomNavigationItemLabel>Search</BottomNavigationItemLabel>
          </BottomNavigationItem>
          <BottomNavigationItem value="messages" aria-label="Messages">
            <BottomNavigationItemIcon>
              <MessageCircle />
            </BottomNavigationItemIcon>
            <BottomNavigationItemLabel>Messages</BottomNavigationItemLabel>
          </BottomNavigationItem>
          <BottomNavigationItem value="profile" aria-label="Profile">
            <BottomNavigationItemIcon>
              <User />
            </BottomNavigationItemIcon>
            <BottomNavigationItemLabel>Profile</BottomNavigationItemLabel>
          </BottomNavigationItem>
          <BottomNavigationItem value="settings" aria-label="Settings">
            <BottomNavigationItemIcon>
              <Settings />
            </BottomNavigationItemIcon>
            <BottomNavigationItemLabel>Settings</BottomNavigationItemLabel>
          </BottomNavigationItem>
        </BottomNavigationList>
      </BottomNavigation>
    </div>
  );
}
