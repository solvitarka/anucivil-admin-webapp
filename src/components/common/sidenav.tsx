import Link from "next/link";

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {

  Home,
  LineChart,

  Package,
  Package2,
Pickaxe ,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

export default function SideNav() {
  return (
    <TooltipProvider> <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
    <Link
      href="#"
      className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
    >
      <Pickaxe  className="h-4 w-4 transition-all group-hover:scale-110" />
      <span className="sr-only">Anu Civil</span>
    </Link>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Dashboard</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Dashboard</TooltipContent>
    </Tooltip>
    {/* <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/work"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Orders</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Orders</TooltipContent>
    </Tooltip> */}
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/work"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Package className="h-5 w-5" />
          <span className="sr-only">Products</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Products</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/users"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Users2 className="h-5 w-5" />
          <span className="sr-only">Users</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Users</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/analytics"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <LineChart className="h-5 w-5" />
          <span className="sr-only">Analytics</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Analytics</TooltipContent>
    </Tooltip>
  </nav>
  <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Settings</TooltipContent>
    </Tooltip>
  </nav></TooltipProvider>
  );
}
