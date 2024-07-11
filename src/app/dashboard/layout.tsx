import SideNav from "@/components/dashboard/sidenav";
import TopNav from "@/components/dashboard/topnav";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >

        {children}

    </div>
  );
}
