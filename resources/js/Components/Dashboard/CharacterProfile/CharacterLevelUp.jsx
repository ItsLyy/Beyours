import CharacterCalculation from "@/Data/CharacterCalculation";
import StatBar from "../StatBar";

export default function CharacterLevelUp({ className, character }) {
  return (
    <div className={className} >
      <p>Level Up</p>
      <div className="flex justify-between items-center gap-2">
        <StatBar className="bg-yellow-200 h-2 w-full" />
        <span>{`${character.experience}/${new CharacterCalculation().CalculationMaxExperience(character.level )}`}</span>
      </div>
    </div>
  )
}
