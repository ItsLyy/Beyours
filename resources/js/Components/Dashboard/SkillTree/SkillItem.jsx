export default function SkillItem({ children }) {
  return (
    <div className="text-center">
      <div className="overflow-hidden rounded-full border-[1px] border-white flex items-center justify-center size-24 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-t after:from-beyours-800 after:to-beyours-900 after:origin-bottom after:scale-y-50 after:transition-all after:ease-in-out after:duration-300">
        {children}
      </div>
      <p className="text-sm text-beyours-100 mt-2">Level 2</p>
      <p className="text-md">Strength</p>
    </div>
  );
}
