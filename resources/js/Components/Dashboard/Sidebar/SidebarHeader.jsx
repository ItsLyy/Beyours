import ApplicationLogo from "@/Components/ApplicationLogo";
import IconAction from "@/Components/Icons/Sidebar/IconAction";

export default function SidebarHeader({ openCloseHandler, isOpen}) {
  return (
    <div className="hidden relative md:flex gap-6 items-center px-8 w-full h-24 bg-beyours-650 border-b-[.5px] border-b-beyours-600 box-border">
      <button onClick={openCloseHandler}>
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
