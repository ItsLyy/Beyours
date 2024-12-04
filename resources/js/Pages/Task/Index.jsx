import HeaderSection from "@/Components/Dashboard/HeaderSection";
import Pagination from "@/Components/Dashboard/Pagination";
import SearchBar from "@/Components/Dashboard/SearchBar";
import IconAdd from "@/Components/Icons/IconAdd";
import IconSearch from "@/Components/Icons/IconSearch";
import PrimaryNavigationButton from "@/Components/PrimaryNavigationButton";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ tasks }) {
  return (
    <AuthenticatedLayout>
      <Head title="Task"/>

      <div className="flex flex-col gap-4 pb-26 w-full py-16 md:h-full md:pb-0">
        {/* Header */}
        <div className="flex justify-between items-center p-2 border-b-beyours-600 border-b-[1px]">
          <HeaderSection
            title="Task"
            subTitle="All task"
          />
          <PrimaryNavigationButton
            href={route('task.create')}
            className="!w-fit !h-fit !p-[.5rem]"
          >
            <IconAdd className="size-5" />
          </PrimaryNavigationButton>
        </div>
        {/* Searchbar */}
        <div className="flex w-full">
          <SearchBar className="w-full" placeholder="Search for task" Icon={IconSearch} />
        </div>
        {/* Content */}
        <div className="w-full h-4/5 box-border bg-beyours-700 rounded-md relative">
          <div className="w-full h-full overflow-y-auto">
            <table className="w-full h-full table-fixed border-collapse">
              <thead className="border-b-[2px] h-12 border-b-beyours-600 bg-beyours-650 sticky top-0">
                <tr>
                  <th className="py-6 px-8 text-start font-normal">Title</th>
                  <th className="py-6 px-8 text-start font-normal">Status</th>
                  <th className="py-6 px-8 text-start font-normal">Assign By</th>
                  <th className="py-6 px-8 text-start font-normal">Due At</th>
                  <th className="py-6 px-8 text-end w-40 font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="text-beyours-150">
                {
                  tasks.data.map(task => {
                    return (
                      <tr key={task.id}>
                        <td className="py-6 px-8 line-clamp-2 text-ellipsis">{task.tasks.title}</td>
                        <td className="py-6 px-8"> <span className={"p-2 text-white rounded-md " + TASK_STATUS_CLASS_MAP[task.done]}>{TASK_STATUS_TEXT_MAP[task.done]}</span></td>
                        <td className="py-6 px-8">{task.tasks.assignBy.fullname}</td>
                        <td className="py-6 px-8">{task.tasks.due_at ? task.tasks.due_at : "Free"}</td>
                        <td className="py-6 px-8"><Link href={route('task.show', task.id)}></Link></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="w-full flex absolute bottom-0 bg-beyours-650 border-t-beyours-600 border-t-[1px] px-6 py-4 h-20 box-border">
            <Pagination links={tasks.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
