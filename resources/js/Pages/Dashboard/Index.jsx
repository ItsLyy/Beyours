import BannerCharacter from "@/Components/Dashboard/BannerCharacter";
import CharacterInfo from "@/Components/Dashboard/CharacterProfile/CharacterInfo";
import ContactList from "@/Components/Dashboard/ContactList";
import HeaderSection from "@/Components/Dashboard/HeaderSection";
import SkillTree from "@/Components/Dashboard/SkillTree";
import TaskOverview from "@/Components/Dashboard/Table/TaskOverview";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

function DashboardHome({ tasks, character, globalFriends }) {
  const user = usePage().props.auth.user;
  const titles = ["Task", "Status"];
  return (
    <>
      <Head title="Dashboard" />

      <section className="w-full h-screen box-border p-8">
        <div className="flex flex-col w-full md:h-full gap-4 pb-24 md:pb-0">
          <HeaderSection
            title="Dashboard"
            subTitle={`Welcome back, ${user.username}`}
          />
          <div className="flex flex-col gap-4 md:flex-row md:h-[90%]">
            <div className="bg-beyours-700 h-[40rem] md:h-auto rounded-md overflow-hidden border-[1px] border-beyours-550 flex-grow col-span-1 row-span-2 relative md:w-[28rem] 2xl:w-[40rem]">
              <BannerCharacter
                character={character}
                className="h-full w-full after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-[#010101] after:from-15% after:h-full after:w-full"
              />
              <CharacterInfo
                character={character}
                className="z-10 overflow-y-auto absolute bottom-0"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 h-full w-full md:grid-cols-3 grid-rows-3 xl:grid-rows-[1fr] box-border">
              <div className="bg-beyours-700 rounded-md max-h-96 border-[1px] border-beyours-550 col-span-1 row-span-1 md:col-span-3 md:row-span-2 md:max-h-none xl:col-span-2 xl:row-span-3">
                <TaskOverview titles={titles} tasks={tasks} />
              </div>
              <div className="bg-beyours-700 rounded-md max-h-96 border-[1px] border-beyours-550 col-span-1 row-span-1 md:col-span-3 md:row-span-1 md:max-h-none xl:col-span-1 xl:row-span-4">
                <ContactList globalFriends={globalFriends} />
              </div>
              <div className="bg-beyours-700 rounded-md max-h-96 h-fit border-[1px] border-beyours-550 col-span-1 row-span-1 md:col-span-3 md:row-span-1 md:max-h-none xl:col-span-2 xl:row-span-1">
                <SkillTree character={character} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

DashboardHome.layout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default DashboardHome;
