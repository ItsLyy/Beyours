import CharacterCalculation from "@/Data/CharacterCalculation";

export default function SkillItem({ children, name, level, experience }) {
  const maxExperienceSkill = new CharacterCalculation().CalculationMaxSkillExperience();

  return (
    <div className="text-center">
      <div className={`overflow-hidden rounded-full border-[1px] border-white flex items-center justify-center size-24 relative  skill`} >
        {children}
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-beyours-800 shadow-xl shadow-beyours-900 drop-shadow-lg to-beyours-900 origin-bottom transition-all ease-in-out duration-300 " style={{transform: `scaleY(${experience/maxExperienceSkill})`}}></div>
      </div>
      <p className="text-sm text-nowrap text-beyours-100 mt-2">Level {level}</p>
      <p className="text-md text-nowrap">{name}</p>
    </div>
  );
}
