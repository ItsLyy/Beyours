import ApplicationLogo from "@/Components/ApplicationLogo";
import IconAction from "@/Components/Icons/Sidebar/IconAction";

export default function SidebarHeader({ openCloseHandler, isOpen}) {
  return (
    <div className="hidden relative md:flex gap-6 items-center px-4 w-full h-24 bg-beyours-650 border-b-[.5px] border-b-beyours-600 box-border">
      <button onClick={openCloseHandler} className="p-4 transition-all ease-in-out duration-300 hover:bg-beyours-550">
        <ApplicationLogo className="size-8" />
      </button>
      <h2
        className={
          "text-white text-xl text-nowrap font-normal leading-tight " +
          (isOpen ? "" : "hidden")
        }
      >
        B E Y O U R S
      </h2>
    </div>
  );
}
