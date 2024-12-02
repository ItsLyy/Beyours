export default function StatBar({ className }) {
  return (
    <div className="w-44 h-fit sm:w-64 bg-beyours-600 border-[1px] border-beyours-550 rounded-sm p-[1px] box-content">
      <div className={"rounded-sm w-full " + className}></div>
    </div>
  )
}
