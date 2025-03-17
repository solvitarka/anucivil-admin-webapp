export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-muted/40 p-4 sm:p-6">
      {children}
    </div>
  );
}
