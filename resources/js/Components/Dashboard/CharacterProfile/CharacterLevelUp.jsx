import StatBar from "../StatBar";

export default function CharacterLevelUp({ className }) {
  return (
    <div className={className} >
      <p>Level Up</p>
      <div className="flex justify-between items-center gap-2">
        <StatBar className="bg-yellow-200 h-2 w-full" />
        <span>24/40</span>
      </div>
    </div>
  )
}
