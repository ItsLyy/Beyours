import DashboardHeader from "@/Components/Dashboard/Header";
import Sidebar from "@/Components/Dashboard/Sidebar";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import NoCharacter from "./NoCharacter";

export default function AuthenticatedLayout({ children }) {
  const character = usePage().props.auth.character;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="text-white min-h-screen h-screen bg-beyours-750 flex">
      <Sidebar />
      <main className="flex-grow relative max-h-screen overflow-y-auto box-border px-4 py-2 sm:px-10 sm:py-8">
        <DashboardHeader />
        {character ? children : <NoCharacter /> }

      </main>
    </div>
  );
}
