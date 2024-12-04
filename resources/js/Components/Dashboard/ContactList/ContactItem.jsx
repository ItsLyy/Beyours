import PhotoProfile from "../PhotoProfile";

export default function ContactItem() {
  return(
    <div className="flex items-center gap-2 h-full overflow-y-auto py-4 px-8 border-b-[1px] border-b-beyours-600 even:bg-beyours-550">
      <PhotoProfile className="size-16" />
      <div className="h-full">
        <p>Fullname</p>
        <p className="text-sm text-beyours-400">@Username</p>
      </div>
    </div>
  )
}
