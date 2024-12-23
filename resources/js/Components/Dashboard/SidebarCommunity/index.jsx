import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

export default function SidebarCommunity({ community, character }) {
  return (
    <div
      className={
        "flex flex-row w-full overflow-x-scroll fixed right-0 z-50 justify-between gap-4 transition-all ease-in-out duration-300 md:rounded-r-md md:overflow-clip md:sticky md:top-0 md:w-72 md:flex-col md:h-screen bg-[#161616] md:min-w-72"
      }
    >
      <SidebarHeader
        bannerPath={community.banner_path}
        title={community.name}
      />
      <SidebarBody
        role={community.role}
        communityId={community.id}
        attendanced={community.attendance}
      />
      <SidebarFooter
        role={character.role}
        token={community.token || community.join_token}
      />
    </div>
  );
}
