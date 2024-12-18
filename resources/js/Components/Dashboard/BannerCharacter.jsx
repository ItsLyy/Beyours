import { usePage } from "@inertiajs/react";

export default function BannerCharacter({ className, imagePreview }) {
  const character = usePage().props.auth.character;
  return (
    <div className={"bg-beyours-700 rounded-md overflow-hidden " + className}>
      <img
        src={
          imagePreview
            ? URL.createObjectURL(imagePreview)
            : "/" + (character?.banner_path || "images/defaultavatar.png")
        }
        alt="Default Avatar"
        className="h-full w-full aspect-[3/4] object-cover object-center"
      />
    </div>
  );
}
