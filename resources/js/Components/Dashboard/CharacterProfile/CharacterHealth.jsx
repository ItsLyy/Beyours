import IconHeart from "@/Components/Icons/IconHeart";
import StatBar from "../StatBar";
import CharacterCalculation from "@/Data/CharacterCalculation";
import { useEffect, useState } from "react";

export default function CharacterHealth({ className, character }) {
  const characterCalculation = new CharacterCalculation();

  const [maxHealth, setMaxHealth] = useState(
    characterCalculation.calculationMaxHealth(character.level)
  );
  const [scaleHealthBar, setScaleHealthBar] = useState(
    character.health / maxHealth
  );

  useEffect(() => {
    setMaxHealth(characterCalculation.calculationMaxHealth(character.level));
  }, [character.level]);

  useEffect(() => {
    setScaleHealthBar(character.health / maxHealth);
  }, [character.health]);

  return (
    <div
      className={"flex gap-2 w-full justify-between items-center " + className}
    >
      <IconHeart />
      <StatBar
        className={`h-2 bg-beyours-100 origin-left transition-all ease-in-out duration-300`}
        style={{ transform: `scaleX(${scaleHealthBar})` }}
      />
      <span>
        {character.health}/{maxHealth}
      </span>
    </div>
  );
}
