import PhotoProfile from "../PhotoProfile";
import StatBar from "../StatBar";
import HeaderStat from "./HeaderStat";

export default function DashboardHeader() {
  return (
    <header className="w-full absolute top-0 right-0 bg-gradient-to-b from-beyours-750 h-24 flex justify-end items-center px-4 md:px-12">
      <div className="flex gap-4 md:gap-5 items-center">
        <div className="flex flex-col gap-1 h-full font-sans font-thin">
          <div className="flex-grow">
            <HeaderStat />
          </div>
          <div className="flex-grow">
            <StatBar className="h-[3px] bg-yellow-200" />
          </div>
        </div>
        <PhotoProfile />
      </div>
    </header>
  )
}
