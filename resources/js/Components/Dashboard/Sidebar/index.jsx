import { useEffect, useState } from "react";
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

export default function Sidebar({ isSidebarOpen = true }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(isSidebarOpen);
  }, [isSidebarOpen]);

  const openCloseHeader = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      className={
        "flex flex-row w-full overflow-x-scroll fixed bottom-0 left-0 z-50 justify-between gap-4 transition-all ease-in-out duration-300 md:rounded-r-md md:overflow-clip md:sticky md:top-0 md:bottom-auto md:flex-col md:h-screen bg-beyours-700 " +
        (isOpen ? "md:min-w-72 md:max-w-72" : "md:w-24")
      }
    >
      <SidebarHeader openCloseHandler={openCloseHeader} isOpen={isOpen} />
      <SidebarBody isOpen={isOpen} />
      <SidebarFooter isOpen={isOpen} />
    </div>
  );
}
