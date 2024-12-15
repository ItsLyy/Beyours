import NavigationButton from "../NavigationButton";
import NavigationLabel from "../NavigationLabel";
import IconDiamondFour from "@/Components/Icons/IconDiamondFour";
import IconClipboard from "@/Components/Icons/IconClipboard";
import IconHand from "@/Components/Icons/IconHand";
import IconMember from "@/Components/Icons/IconMember";

export default function SidebarBody({ role, communityId, attendanced }) {
  return (
    <ul className="md:flex-grow">
      <li className="md:w-full flex md:block md:p-4 pl-4 py-4 gap-4 box-border">
        <NavigationButton
          href={route("community.show", communityId)}
          active={route().current("community.show")}
        >
          <IconDiamondFour />
          <NavigationLabel isOpen={true}>Overview</NavigationLabel>
        </NavigationButton>
        {attendanced ? (
          <NavigationButton
            href={route("community.attendance.index", communityId)}
            active={route().current("community.attendance.index")}
          >
            <IconHand />
            <NavigationLabel isOpen={true}>Attendance</NavigationLabel>
          </NavigationButton>
        ) : (
          ""
        )}

        {/* { role === "owner" ?
        <NavigationButton
          active={route().current("community.member.index")}
        >
          <IconMember />
          <NavigationLabel isOpen={true}>Member</NavigationLabel>
        </NavigationButton>
        : "" } */}
      </li>
    </ul>
  );
}
