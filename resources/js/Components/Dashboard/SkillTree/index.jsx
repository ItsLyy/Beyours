import IconHeart from "@/Components/Icons/IconHeart";
import SkillItem from "./SkillItem";

export default function SkillTree({ character }) {
  return (
    <ul className="flex w-full h-full items-center overflow-x-auto p-12 gap-14 box-border">
      {
        character.data.skills.map(skill => {
          return(
            <li key={skill.id}>
              <SkillItem name={skill.name} experience={skill.experience} level={skill.level}>
                <IconHeart className="size-10 stroke-1 relative z-10" />
              </SkillItem>
            </li>
          )
        })
      }
    </ul>
  );
}
