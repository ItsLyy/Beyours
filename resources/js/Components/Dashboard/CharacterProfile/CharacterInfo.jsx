import CharacterBody from "./CharacterBody";
import CharacterHeader from "./CharacterHeader";
import CharacterHealth from "./CharacterHealth";
import CharacterLevelUp from "./CharacterLevelUp";

export default function CharacterInfo({ className }) {
  return (
    <div className={"w-full p-4 flex flex-col " + className}>
      <CharacterHeader />
      <CharacterHealth />
      <CharacterBody className="mt-4" />
      <CharacterLevelUp className="mt-2" />
    </div>
  )
}
