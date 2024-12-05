import { usePage } from "@inertiajs/react"

export default function BannerCharacter({ className, imagePreview }) {
  const character = usePage().props.auth.character;
  return (
    <div className={"bg-beyours-700 aspect-[12/16] rounded-sm overflow-hidden border-b-[1px] border-b-white " + className}>
      <img src={ imagePreview ? URL.createObjectURL(imagePreview) : character?.banner_path || "/images/defaultavatar.png"} alt="Default Avatar" className="h-full w-full object-cover object-center" />
    </div>
  )
}
