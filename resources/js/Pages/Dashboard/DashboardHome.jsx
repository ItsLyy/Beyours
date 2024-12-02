import CharacterProfile from "@/Components/Dashboard/CharacterProfile";
import ContactList from "@/Components/Dashboard/ContactList";
import HeaderSection from "@/Components/Dashboard/HeaderSection";
import SkillTree from "@/Components/Dashboard/SkillTree";
import TaskOverview from "@/Components/Dashboard/Table/TaskOverview";
import { usePage } from "@inertiajs/react";

export default function DashboardHome() {
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
  ];
  return (
    <div className="flex flex-col w-full h-full gap-8 pb-24">
      <HeaderSection
        title="Dashboard"
        subTitle={`Welcome back, ${user.name}`}
      />
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 h-full pb-24">
        <CharacterProfile />
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-4 md:grid-rows-3 gap-2 box-border pb-24 sm:pb-0">
          <TaskOverview className="sm:h-fit xl:col-span-2 row-span-2" titles={titles} datas={datas} />
          <ContactList className="row-span-2" />
          <div className="xl:col-span-2 h-full bg-beyours-700 rounded-md">
            <SkillTree />
          </div>
          <div className="h-full bg-beyours-700">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
