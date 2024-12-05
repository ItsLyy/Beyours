import { usePage } from "@inertiajs/react";

export default function PhotoProfile({className , imagePreview}) {
  const user = usePage().props.auth.user;
  return (
    <div className={"bg-beyours-700 border-beyours-100 border-[1px] p-[1px] rounded-full overflow-hidden " + className }>
      <img
        src={ imagePreview ? URL.createObjectURL(imagePreview) : user.photo_profile || "/images/defaultavatar.png"}
        alt="Default Avatar"
        className="w-full h-full box-border object-cover object-center shadow-sm rounded-full"
      />
    </div>
  );
}
