import { useState } from "react";
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const openCloseHeader = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <div className={"flex flex-row w-full overflow-x-scroll absolute bottom-0 left-0 justify-between gap-4 transition-all ease-in-out duration-300 md:overflow-clip md:relative md:flex-col md:h-screen bg-beyours-700 " + (isOpen ? "md:w-72" : "md:w-24") }>
      <SidebarHeader openCloseHandler={openCloseHeader} isOpen={isOpen}/>
      <SidebarBody isOpen={isOpen} />
      <SidebarFooter isOpen={isOpen} />
    </div>
  )
}
