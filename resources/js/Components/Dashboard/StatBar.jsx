export default function StatBar({ className, ...props }) {
  return (
    <div className="h-fit w-full bg-beyours-600 border-[1px] border-beyours-550 rounded-full p-[1px] box-content">
      <div className={"rounded-full " + className} {...props}></div>
    </div>
  );
}
