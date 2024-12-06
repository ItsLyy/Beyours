import PhotoProfile from "../PhotoProfile";
import HeaderStat from "./HeaderStat";
import { usePage } from "@inertiajs/react";

export default function DashboardHeader() {
  const user = usePage().props.auth.user;
  return (
    <header className="w-full absolute top-0 right-0 h-24 flex justify-end items-center px-4 md:px-12">
      <div className="flex gap-4 items-center border-[1px] border-beyours-400 bg-beyours-600 rounded-full py-2 pl-4 pr-12 backdrop-blur-sm md:gap-5">
        <PhotoProfile className="size-10" imageData={user.photo_profile} />
        <HeaderStat />
      </div>
    </header>
  )
}
