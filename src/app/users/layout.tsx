export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full p-4 sm:p-6">
      {children}
    </div>
  );
}
