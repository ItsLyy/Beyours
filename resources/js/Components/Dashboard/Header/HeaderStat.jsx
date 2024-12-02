import { usePage } from "@inertiajs/react";

export default function HeaderStat() {
  const user = usePage().props.auth.user;
  return (
    <div className="flex justify-between items-end text-white leading-tight">
      <span className="text-xs md:text-xs">Lvl. 24</span>
      <span className="text-xl md:text-xl font-[100]">@{user.name}</span>
    </div>
  )
}
