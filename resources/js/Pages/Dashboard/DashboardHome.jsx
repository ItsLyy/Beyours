import BannerCharacter from "@/Components/Dashboard/BannerCharacter";
import CharacterProfile from "@/Components/Dashboard/CharacterProfile";
import CharacterInfo from "@/Components/Dashboard/CharacterProfile/CharacterInfo";
import ContactList from "@/Components/Dashboard/ContactList";
import HeaderSection from "@/Components/Dashboard/HeaderSection";
import SkillTree from "@/Components/Dashboard/SkillTree";
import TaskOverview from "@/Components/Dashboard/Table/TaskOverview";
import { usePage } from "@inertiajs/react";

export default function DashboardHome({  }) {
  const user = usePage().props.auth.user;
  const titles = ['Task', 'Status'];
  const datas = [
    {
      task: 'Take any attendance',
      status: 'Pending'
    },
    {
      task: 'Take any attendance',
      status: 'Pending'
    },
    {
      task: 'Take any attendance',
      status: 'Pending'
    },
    {
      task: 'Take any attendance',
      status: 'Pending'
    },
    {
      task: 'Take any attendance',
      status: 'Pending'
    },
    {
      task: 'Take any attendance',
      status: 'Pending'
    },
  ];
  return (
    <div className="flex flex-col w-full md:h-full gap-4 pb-24 md:pb-0">
      <HeaderSection
        title="Dashboard"
        subTitle={`Welcome back, ${user.name}`}
      />
      <div className="flex flex-col gap-4 md:flex-row md:h-[90%]">
        <div className="bg-beyours-700 rounded-md border-[1px] border-beyours-550 flex-grow col-span-1 row-span-2 relative md:w-[28rem] md:h-fit">
          <BannerCharacter className="h-auto w-full aspect-[12/16] after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-beyours-700 after:h-full after:w-full" />
          <CharacterInfo className="relative z-10" />
        </div>
        <div className="grid grid-cols-1 gap-4 h-full w-full md:grid-cols-3 md:grid-rows-[1fr] box-border">
          <div className="bg-beyours-700 rounded-md border-[1px] border-beyours-550 col-span-1 row-span-1 md:col-span-3 md:row-span-2 xl:col-span-2 xl:row-span-3">
            <TaskOverview titles={titles} datas={datas}/>
          </div>
          <div className="bg-beyours-700 rounded-md border-[1px] border-beyours-550 col-span-1 row-span-1 md:col-span-3 md:row-span-1 xl:col-span-1 xl:row-span-4">
            <ContactList />
          </div>
          <div className="bg-beyours-700 rounded-md border-[1px] border-beyours-550 col-span-1 row-span-1 md:col-span-3 md:row-span-1 xl:col-span-2 xl:row-span-1">
            <SkillTree />
          </div>
        </div>
      </div>
    </div>
  )
}
