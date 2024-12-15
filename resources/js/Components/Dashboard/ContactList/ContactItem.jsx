import PhotoProfile from "../PhotoProfile";

export default function ContactItem({ fullname, name, imageData }) {
  return (
    <div className="flex items-center gap-6 h-full overflow-y-auto py-4 px-8 border-b-[1px] border-b-beyours-600 even:bg-beyours-550">
      <PhotoProfile className="size-16" imageData={imageData} />
      <div className="h-full">
        <p>{fullname}</p>
        <p className="text-sm text-beyours-400">@{name}</p>
      </div>
    </div>
  );
}
