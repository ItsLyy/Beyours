import Sidebar from "@/Components/Dashboard/Sidebar";
import SidebarCommunity from "@/Components/Dashboard/SidebarCommunity";
import AuthenticatedLayout from "./AuthenticatedLayout";

export default function CommunityLayout({ children, community, character }) {
  return (
    <AuthenticatedLayout>
      <div className="flex">
        <SidebarCommunity community={community} character={character} />
        <main className="grow">{children}</main>
      </div>
    </AuthenticatedLayout>
  );
}
