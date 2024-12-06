import Sidebar from "@/Components/Dashboard/Sidebar";
import SidebarCommunity from "@/Components/Dashboard/SidebarCommunity";

export default function CommunityLayout({ children, community, yourCharacter, members }) {
  return (
    <div className="flex bg-beyours-750 h-screen">
      <Sidebar />
      <SidebarCommunity community = {community} role={yourCharacter.pivot.role} />
      <main className="grow h-full">
        {children}
      </main>
    </div>
  )
}
