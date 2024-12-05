import HeaderSection from "@/Components/Dashboard/HeaderSection";
import PrimaryNavigationButton from "@/Components/PrimaryNavigationButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ tasks }) {
  return (
    <AuthenticatedLayout>
      <Head title="Add Task"/>

      <div className="flex flex-col gap-4 pb-26 w-full py-16 md:h-full md:pb-0">
        <div className="p-2 border-b-beyours-600 border-b-[1px]">
          <HeaderSection
            title="Add Task"
            subTitle="Add your task in here"
          />
        </div>

      </div>
    </AuthenticatedLayout>
  )
}
