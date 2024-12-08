import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

export default function SidebarCommunity({ community, character }) {
  return (
    <div className={"flex flex-row min-w-72 max-w-72 w-72 overflow-x-scroll fixed bottom-0 right-0 z-50 justify-between gap-4 transition-all ease-in-out duration-300 md:rounded-r-md md:overflow-clip md:relative md:flex-col md:h-screen bg-[#161616]" }>
      <SidebarHeader bannerPath={ community.banner_path } title={community.name} />
      <SidebarBody role={community.role} communityId={community.id} attendanced={community.attendance} />
      <SidebarFooter role={character.role} token={community.token || community.join_token} />
    </div>
  )
}
