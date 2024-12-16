import DashboardHeader from "@/Components/Dashboard/Header";
import Sidebar from "@/Components/Dashboard/Sidebar";
import { usePage } from "@inertiajs/react";
import NoCharacter from "./NoCharacter";

export default function AuthenticatedLayout({ children, isMain = true }) {
  const character = usePage().props.auth.character;

  return (
    <div className="text-white bg-beyours-750 flex">
      {character ? <Sidebar /> : ""}
      {isMain ? (
        <main className="flex-grow relative">
          <DashboardHeader />
          {character ? children : <NoCharacter />}
        </main>
      ) : (
        children
      )}
    </div>
  );
}
