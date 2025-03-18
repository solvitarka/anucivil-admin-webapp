// src/components/common/sidenav.tsx
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Home,
  LineChart,
  Users2,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/components/auth/state/auth.state";

export default function SideNav() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to login page or handle post-signout logic
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const navItemClass = (href: string) => {
    return `flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 
      ${isActive(href) 
        ? 'bg-primary/10 text-primary shadow-sm' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`;
  };

  return (
    <TooltipProvider>
      <div className="flex h-full w-full flex-col items-center justify-between py-6">
        <div className="flex w-full flex-col items-center gap-5">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            A
          </div>
          <Link href="/dashboard" className={navItemClass('/dashboard')}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Home className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </Link>
          <Link href="/users" className={navItemClass('/users')}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Users2 className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent side="right">Users</TooltipContent>
            </Tooltip>
          </Link>
        </div>
        <button 
          onClick={handleSignOut} 
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <LogOut className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </button>
      </div>
    </TooltipProvider>
  );
}