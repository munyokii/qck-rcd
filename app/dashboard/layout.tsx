import SideNav from "../components/dashboard/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-base-200">
      <SideNav />

      <main className="flex-1 lg:ml-64 relative flex flex-col min-h-screen">
        <div className="h-16 lg:hidden" />
        <div className="p-4 md:p-8 pb-24 lg:pb-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}