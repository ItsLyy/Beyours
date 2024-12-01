import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

export default function Sidebar() {
  return (
    <div className="flex flex-row w-full overflow-x-scroll absolute bottom-0 left-0 justify-between gap-4 md:overflow-clip md:relative md:w-72 md:flex-col md:h-screen bg-beyours-700">
      <SidebarHeader />
      <SidebarBody />
      <SidebarFooter />
    </div>
  )
}
