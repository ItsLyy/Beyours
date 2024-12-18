import SidebarCommunity from "@/Components/Dashboard/SidebarCommunity";

const CommunityLayout = ({ children, community, character }) => {
  return (
    <div className="flex w-full">
      <SidebarCommunity community={community} character={character} />
      <main className="grow">{children}</main>
    </div>
  );
};

export default CommunityLayout;
