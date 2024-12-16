import { usePage } from "@inertiajs/react";

export default function HeaderStat() {
  const user = usePage().props.auth.user;
  return (
    <div className="flex flex-col justify-center text-white">
      <span className="leading-none font-thin">@{user.username}</span>
    </div>
  );
}
