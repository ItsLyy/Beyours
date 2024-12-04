import CharacterBody from "./CharacterBody";
import CharacterHeader from "./CharacterHeader";
import CharacterHealth from "./CharacterHealth";
import CharacterLevelUp from "./CharacterLevelUp";

export default function CharacterInfo({ className, character }) {
  return (
    <div className={"w-full p-4 flex flex-col " + className}>
      <CharacterHeader character={character?.data} />
      <CharacterHealth character={character?.data} />
      <CharacterBody character={character?.data} className="mt-4" />
      <CharacterLevelUp character={character?.data} className="mt-2" />
    </div>
  )
}
