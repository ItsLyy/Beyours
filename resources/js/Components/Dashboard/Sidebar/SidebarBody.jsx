import IconHome from "@/Components/Icons/Sidebar/IconHome";
import NavigationButton from "../NavigationButton";
import IconUser from "@/Components/Icons/IconUser";
import IconTask from "@/Components/Icons/Sidebar/IconTask";
import IconCommunity from "@/Components/Icons/Sidebar/IconCommunity";
import NavigationLabel from "../NavigationLabel";

export default function SidebarBody() {
  return (
    <ul className="md:flex-grow">
      <li className="md:w-full flex md:block md:p-4 pl-4 py-4 gap-4 box-border">
        <NavigationButton
          href={route("dashboard")}
          active={route().current('dashboard')}
        >
          <IconHome /> <NavigationLabel>Home</NavigationLabel>
        </NavigationButton>
        <NavigationButton>
          <IconTask /> <NavigationLabel>Task</NavigationLabel>
        </NavigationButton>
        <NavigationButton>
          <IconCommunity /> <NavigationLabel>Community</NavigationLabel>
        </NavigationButton>
        <NavigationButton>
          <IconUser /> <NavigationLabel>Profile</NavigationLabel>
        </NavigationButton>
      </li>
    </ul>
  );
}
