import IconHeart from "@/Components/Icons/IconHeart";
import StatBar from "../StatBar";

export default function CharacterInfo() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mt-4 text-beyours-150">
        <span className="text-xl">Full Name</span>
        <span className="text-sm text-beyours-400">Level 24</span>
      </div>
      <div className="flex gap-4 justify-between items-center">
        <IconHeart />
        <StatBar className="h-2 bg-beyours-100 origin-left scale-x-50" />
        <span>24/40</span>
      </div>
      <table className="mt-4">
        <tbody>
          <tr>
            <td className="text-beyours-400 w-24 block">Profession</td>
            <td>: Programmer</td>
          </tr>
          <tr>
            <td className="text-beyours-400 w-24 block">Skill</td>
            <td>: HTML, CSS, JS, Valorant</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-8">
        <p>Level Up</p>
        <div className="flex justify-between items-center">
          <span><StatBar className="bg-yellow-200 h-2" /></span>
          <span>24/40</span>
        </div>
      </div>
    </div>
  )
}
