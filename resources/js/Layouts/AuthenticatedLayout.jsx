import DashboardHeader from "@/Components/Dashboard/Header";
import Sidebar from "@/Components/Dashboard/Sidebar";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="text-white min-h-screen h-screen bg-beyours-750 flex">
      <Sidebar />
      <main className="flex-grow relative max-h-screen overflow-y-auto box-border px-4 py-2 sm:px-10 sm:py-8">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}
