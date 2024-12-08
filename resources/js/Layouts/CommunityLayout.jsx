import Sidebar from "@/Components/Dashboard/Sidebar";
import SidebarCommunity from "@/Components/Dashboard/SidebarCommunity";

export default function CommunityLayout({ children, community, character }) {
  return (
    <div className="flex bg-beyours-750 h-screen">
      <Sidebar />
      <SidebarCommunity community = {community} character={character}  />
      <main className="grow h-full">
        {children}
      </main>
    </div>
  )
}
