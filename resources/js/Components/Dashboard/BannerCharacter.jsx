export default function BannerCharacter({ className }) {
  return (
    <div className={"bg-beyours-700 rounded-sm overflow-hidden border-b-[1px] border-b-white " + className}>
      <img src="storage/images/defaultavatar.png" alt="Default Avatar" className="h-full w-full object-cover object-center" />
    </div>
  )
}
