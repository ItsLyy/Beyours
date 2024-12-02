import DashboardHeader from "@/Components/Dashboard/Header";
import Sidebar from "@/Components/Dashboard/Sidebar";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="text-white h-screen bg-beyours-750 flex">
      <Sidebar />
      <main className="flex-grow relative pt-24 px-10 h-full overflow-y-auto box-border">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}
