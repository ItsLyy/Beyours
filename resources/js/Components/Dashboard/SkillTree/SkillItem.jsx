import CharacterCalculation from "@/Data/CharacterCalculation";

export default function SkillItem({ children, name, level, experience }) {
  const maxExperienceSkill = new CharacterCalculation().CalculationMaxSkillExperience();
  const scaleBar = .5;

  return (
    <div className="text-center">
      <div className={`overflow-hidden rounded-full border-[1px] border-white flex items-center justify-center size-24 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-t after:from-beyours-800 after:to-beyours-900 after:origin-bottom after:transition-all after:ease-in-out after:duration-300 skill`} >
        {children}
      </div>
      <p className="text-sm text-nowrap text-beyours-100 mt-2">Level {level}</p>
      <p className="text-md text-nowrap">{name}</p>
    </div>
  );
}
