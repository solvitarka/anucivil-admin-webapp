import SideNav from "@/components/dashboard/sidenav";
import TopNav from "@/components/dashboard/topnav";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideNav />
      <div className="flex flex-col">
        <TopNav />
        {children}
      </div>
    </div>
  );
}
