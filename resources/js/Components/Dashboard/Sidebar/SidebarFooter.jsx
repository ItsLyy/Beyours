import IconLogout from "@/Components/Icons/Sidebar/IconLogout";
import NavigationButton from "../NavigationButton";
import NavigationLabel from "../NavigationLabel";

export default function SidebarFooter() {
  return (
    <div className="flex items-center pr-4 py-4 md:px-4 md:w-full md:h-24 md:bg-beyours-650 md:border-t-[.5px] md:border-t-beyours-600 box-border">
      <NavigationButton>
        <IconLogout/> <NavigationLabel>Logout</NavigationLabel>
      </NavigationButton>
    </div>
  )
}
