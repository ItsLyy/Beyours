import IconHeart from "@/Components/Icons/IconHeart";
import SkillItem from "./SkillItem";
import IconSkill from "@/Components/Icons/IconSkill";
import IconStar from "@/Components/Icons/IconStar";
import IconFire from "@/Components/Icons/IconFire";

export default function SkillTree({ character }) {
  return (
    <ul className="flex w-full h-full items-center overflow-x-auto p-12 gap-14 box-border">
      <li >
        <SkillItem name={character.data.skills[0].name} experience={character.data.skills[0].experience} level={character.data.skills[0].level}>
          <IconHeart className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>
      <li >
        <SkillItem name={character.data.skills[1].name} experience={character.data.skills[1].experience} level={character.data.skills[1].level}>
          <IconStar className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>
      <li >
        <SkillItem name={character.data.skills[2].name} experience={character.data.skills[2].experience} level={character.data.skills[2].level}>
          <IconFire className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>
      <li >
        <SkillItem name={character.data.skills[3].name} experience={character.data.skills[3].experience} level={character.data.skills[3].level}>
          <IconSkill className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>
      <li >
        <SkillItem name={character.data.skills[4].name} experience={character.data.skills[4].experience} level={character.data.skills[4].level}>
          <IconSkill className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>
    </ul>
  );
}
