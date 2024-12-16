import IconHome from "@/Components/Icons/Sidebar/IconHome";
import NavigationButton from "../NavigationButton";
import IconUser from "@/Components/Icons/IconUser";
import IconTask from "@/Components/Icons/Sidebar/IconTask";
import IconCommunity from "@/Components/Icons/Sidebar/IconCommunity";
import NavigationLabel from "../NavigationLabel";

export default function SidebarBody({ isOpen }) {
  return (
    <ul className="md:flex-grow">
      <li className="md:w-full flex md:block md:p-4 pl-4 py-4 gap-4 box-border">
        <NavigationButton
          className={isOpen ? "" : "pl-5"}
          href={route("dashboard")}
          active={route().current("dashboard")}
          aria-label="Home Navigation"
        >
          <IconHome /> <NavigationLabel isOpen={isOpen}>Home</NavigationLabel>
        </NavigationButton>
        <NavigationButton
          className={isOpen ? "" : "pl-5"}
          href={route("task.index")}
          active={route().current("task.index")}
          aria-label="Task Navigation"
        >
          <IconTask /> <NavigationLabel isOpen={isOpen}>Task</NavigationLabel>
        </NavigationButton>
        <NavigationButton
          className={isOpen ? "" : "pl-5"}
          href={route("community.index")}
          active={route().current("community.index")}
          aria-label="Community Navigation"
        >
          <IconCommunity />
          <NavigationLabel isOpen={isOpen}>Community</NavigationLabel>
        </NavigationButton>
        <NavigationButton
          className={isOpen ? "" : "pl-5"}
          href={route("profile.edit")}
          active={route().current("profile.edit")}
          aria-label="Profile Navigation"
        >
          <IconUser />
          <NavigationLabel isOpen={isOpen}>Profile</NavigationLabel>
        </NavigationButton>
      </li>
    </ul>
  );
}
