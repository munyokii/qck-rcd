"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, Users, User, Box, Bell, Building2, FileText, Receipt, 
  CreditCard, BarChart3, LogOut, Menu, X,
} from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import BusinessProfileModal from "./BusinessProfileModal";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Items", href: "/dashboard/items", icon: Box },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { name: "Receipts", href: "/dashboard/receipts", icon: Receipt },
  { name: "Expenses", href: "/dashboard/expenses", icon: CreditCard },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export default function SideNav() {
  const pathname = usePathname();
  const modalRef = useRef<HTMLDialogElement>(null);
  const profileModalRef = useRef<HTMLDialogElement>(null);

  const [companyName, setCompanyName] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);

  const isActive = (path: string) => pathname === path;
  const closeMobileMenu = () => modalRef.current?.close();
  const handleLogout = () => signOut({ callbackUrl: "/login" });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await fetch("/api/company");
        if (res.ok) {
          const data = await res.json();
          if (data.company) {
            setCompanyName(data.company.name);
            setCompanyLogo(data.company.logoUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch company data", error);
      } finally {
        setIsLoadingCompany(false);
      }
    };

    fetchCompanyData();
  }, []);

  return (
    <>
      <aside className="hidden lg:flex w-64 flex-col bg-base-100 border-r border-base-300 h-full fixed left-0 top-0 z-20">
        <div className="flex-none">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary-content font-bold overflow-hidden relative shrink-0">
              {companyLogo ? (
                 <Image 
                   src={companyLogo} 
                   alt="Company Logo" 
                   fill 
                   className="object-cover"
                 />
              ) : (
                 <span>{companyName ? companyName.substring(0, 2).toUpperCase() : "QR"}</span>
              )}
            </div>
            
            <span className="text-lg font-bold text-base-content truncate">
              {companyName || "QuickRecords"}
            </span>
          </div>
          <div className="px-4 mb-4">
            <button 
              onClick={() => profileModalRef.current?.showModal()} 
              className="w-full text-left bg-base-200 p-4 rounded-xl border border-base-300 hover:border-primary/50 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                 <p className="text-xs font-bold text-primary uppercase tracking-wider">Company Profile</p>
                 <Building2 className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-semibold text-base-content truncate">
                {isLoadingCompany ? (
                    <span className="loading loading-dots loading-xs"></span>
                ) : (
                    companyName || "Setup Company"
                )}
              </p>
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-primary text-primary-content shadow-md"
                    : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex-none p-6 mt-auto border-t border-base-300 bg-base-100">
          <div className="flex items-center justify-between w-full">
            
            <div className="tooltip tooltip-top" data-tip="Theme">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-base-200 transition-colors text-base-content/70">
                <ThemeToggle />
              </div>
            </div>

            <div className="tooltip tooltip-top" data-tip="Profile Settings">
              <Link 
                href="/dashboard/profile" 
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-base-200 text-base-content/70 hover:text-primary transition-all"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>

            <div className="tooltip tooltip-top" data-tip="Notifications">
              <button 
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-base-200 text-base-content/70 hover:text-primary transition-all"
              >
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                </div>
              </button>
            </div>

            <div className="tooltip tooltip-top" data-tip="Logout">
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-error/10 text-base-content/70 hover:text-error transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-base-100 border-b border-base-300 z-30 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary-content font-bold overflow-hidden relative shrink-0">
            {companyLogo ? (
                <Image 
                  src={companyLogo} 
                  alt="Company Logo" 
                  fill 
                  className="object-cover"
                />
            ) : (
                <span>{companyName ? companyName.substring(0, 2).toUpperCase() : "QR"}</span>
            )}
          </div>
            
          <span className="text-lg font-bold text-base-content truncate">
            {companyName || "QuickRecords"}
          </span>
        </div>
      </div>

      <div className="dock lg:hidden z-30 bg-base-100 border-t border-base-300">
        {navLinks.slice(0, 4).map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={isActive(link.href) ? "dock-active text-primary" : "text-base-content/50"}
            >
              <Icon className="size-[1.2em]" />
              <span className="dock-label">{link.name}</span>
            </Link>
          );
        })}
        <button onClick={() => modalRef.current?.showModal()} className="text-base-content/50">
          <Menu className="size-[1.2em]" />
          <span className="dock-label">More</span>
        </button>
      </div>

      <BusinessProfileModal modalRef={profileModalRef} />

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 p-0 rounded-t-2xl">
          <div className="flex justify-between items-center p-4 border-b border-base-300">
            <h3 className="font-bold text-lg text-base-content">Navigation Menu</h3>
            <button onClick={closeMobileMenu} className="btn btn-sm btn-circle btn-ghost text-base-content"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto bg-base-100">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive(link.href) 
                    ? "bg-primary text-primary-content" 
                    : "text-base-content/70 hover:bg-base-200"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}

            <div className="h-px bg-base-300 my-4"></div>
            
            <div className="grid grid-cols-4 gap-2">
              <div className="flex items-center justify-center p-4 bg-base-200 rounded-2xl active:scale-95 transition-transform tooltip tooltip-top" data-tip="Theme">
                <ThemeToggle />
              </div>

              <Link 
                href="/dashboard/profile"
                onClick={closeMobileMenu}
                className="flex items-center justify-center p-4 bg-base-200 text-base-content rounded-2xl active:scale-95 transition-transform tooltip tooltip-top" data-tip="Profile"
              >
                <User className="w-6 h-6" />
              </Link>

              <button className="flex items-center justify-center p-4 bg-base-200 text-base-content rounded-2xl active:scale-95 transition-transform tooltip tooltip-top" data-tip="Notifications">
                <Bell className="w-6 h-6" />
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center p-4 bg-error/10 text-error rounded-2xl active:scale-95 transition-transform tooltip tooltip-top" data-tip="Logout">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
    </>
  );
}