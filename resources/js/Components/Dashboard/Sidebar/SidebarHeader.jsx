import ApplicationLogo from "@/Components/ApplicationLogo";

export default function SidebarHeader() {
  return (
    <div className="hidden md:flex gap-6 items-center px-8 w-full h-24 bg-beyours-650 border-b-[.5px] border-b-beyours-600 box-border">
      <ApplicationLogo className="size-8" />
      <h2 className="text-white text-xl font-normal leading-tight">B E Y O U R S</h2>
    </div>
  )
}
