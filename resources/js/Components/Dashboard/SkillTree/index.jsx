import IconHeart from "@/Components/Icons/IconHeart";
import SkillItem from "./SkillItem";

export default function SkillTree() {
  return (
    <ul className="flex w-full h-full items-center overflow-x-auto p-12 gap-14 box-border">
      <li>
        <SkillItem>
          <IconHeart className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>
      <li>
        <SkillItem>
          <IconHeart className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>
      <li>
        <SkillItem>
          <IconHeart className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>
      <li>
        <SkillItem>
          <IconHeart className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>
      <li>
        <SkillItem>
          <IconHeart className="size-10 stroke-1 relative z-10" />
        </SkillItem>
      </li>

    </ul>
  );
}
