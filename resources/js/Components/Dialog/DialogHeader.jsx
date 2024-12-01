import ApplicationLogo from "../ApplicationLogo";

export default function DialogHeader({ title }) {
  return (
    <div className="flex justify-between items-center py-6 px-12 text-[#ffff] border-b-[.5px] border-b-beyours-600">
      <h2 className="text-xl leading-loose align-middle">{title}</h2>
      <ApplicationLogo className="size-8"/>
    </div>
  )
}
