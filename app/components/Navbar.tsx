// app/components/Navbar.tsx
"use client";

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <div className="w-6 h-6" />,
});

export default function Navbar() {
  return (
    <div className="navbar fixed top-0 w-full z-50 px-4 md:px-8 shadow-sm bg-base-100/80 backdrop-blur-md transition-all duration-300">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl font-bold tracking-tight">QUICK RECORDS</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-medium">
          <li><a>Home</a></li>
          <li><a>About</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        <ThemeToggle />
        <a className="btn btn-primary btn-sm md:btn-md rounded-lg">Login</a>
      </div>
    </div>
  );
}