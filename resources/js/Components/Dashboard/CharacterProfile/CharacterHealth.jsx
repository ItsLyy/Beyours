import IconHeart from "@/Components/Icons/IconHeart";
import StatBar from "../StatBar";
import CharacterCalculation from "@/Data/CharacterCalculation";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function CharacterHealth({ className }) {
  const character = usePage().props.auth.character;
  const characterCalculation = new CharacterCalculation();

  const [maxHealth, setMaxHealth] = useState(characterCalculation.CalculationMaxHealth(character.level));
  const [scaleHealthBar, setScaleHealthBar] = useState(character.health/maxHealth);

  return (
    <div className={"flex gap-2 w-full justify-between items-center " + className}>
      <IconHeart />
      <StatBar className={`h-2 bg-beyours-100 origin-left scale-x-[${scaleHealthBar}]`} />
      <span>{character.health}/{maxHealth}</span>
    </div>
  )
}
