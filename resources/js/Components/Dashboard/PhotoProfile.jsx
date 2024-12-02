import { usePage } from "@inertiajs/react";

export default function PhotoProfile({className}) {
  const user = usePage().props.auth.user;
  return (
    <div className={"bg-beyours-700 border-beyours-100 border-2 p-[1px] rounded-full size-12 overflow-hidden " + className }>
      <img
        src={user.photo_profile ? "" : "storage/images/defaultavatar.png"}
        alt="Default Avatar"
        className="w-full h-full box-border object-cover object-top shadow-sm rounded-full"
      />
    </div>
  );
}
