import HeaderSection from "@/Components/Dashboard/HeaderSection";
import Pagination from "@/Components/Dashboard/Pagination";
import SearchBar from "@/Components/Dashboard/SearchBar";
import IconAdd from "@/Components/Icons/IconAdd";
import IconDetail from "@/Components/Icons/IconDetail";
import IconSearch from "@/Components/Icons/IconSearch";
import PrimaryNavigationButton from "@/Components/PrimaryNavigationButton";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ tasks }) {
  const [searchValue, setSearchValue] = useState("");

  console.log(tasks);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Task" />

      <div className="flex flex-col gap-4 pb-24 w-full py-16 h-full md:pb-0">
        {/* Header */}
        <div className="flex justify-between items-center p-2 border-b-beyours-600 border-b-[1px]">
          <HeaderSection title="Task" subTitle="All task" />
          <PrimaryNavigationButton
            href={route("task.create")}
            className="!w-fit !h-fit !p-[.5rem]"
          >
            <IconAdd className="size-5" />
          </PrimaryNavigationButton>
        </div>
        {/* Searchbar */}
        <div className="flex w-full">
          <SearchBar
            className="w-full"
            placeholder="Search for task"
            Icon={IconSearch}
            eventHandler={searchHandler}
          />
        </div>
        {/* Content */}
        <div className="w-full h-4/5 box-border bg-beyours-700 rounded-md relative">
          <div className="w-full max-h-full overflow-y-auto block">
            <table className="w-full h-full table-fixed border-collapse">
              <thead className="border-b-[2px] h-12 border-b-beyours-600 bg-beyours-650 sticky top-0">
                <tr className="h-16">
                  <th className="py-6 px-8 text-start font-normal">Title</th>
                  <th className="py-6 px-8 text-start font-normal hidden xl:table-cell">
                    Status
                  </th>
                  <th className="py-6 px-8 text-start font-normal hidden xl:table-cell">
                    Assign By
                  </th>
                  <th className="py-6 px-8 text-start font-normal hidden xl:table-cell">
                    Due At
                  </th>
                  <th className="py-6 px-8 text-end w-40 font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-beyours-150">
                {
                  tasks.data.filter((task) =>
                    searchValue
                      ? task.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                      : task
                  )
                  .map((task) => {
                    return (
                      <tr key={task.id}>
                        <td className="py-6 px-8">
                          {task.title}
                          <dl className="xl:hidden flex gap-3">
                            <dt className="sr-only">Status</dt>
                            <dd className="mt-4 ">
                              <span
                                className={
                                  "p-2 text-white rounded-md " +
                                  TASK_STATUS_CLASS_MAP[task.assignTo.pivot.done]
                                }
                              >
                                {TASK_STATUS_TEXT_MAP[task.assignTo.pivot.done]}
                              </span>
                            </dd>
                            <dt className="sr-only">Assign By</dt>
                            <dd className="mt-4 ">
                              | {task.assignBy.fullname} |
                            </dd>
                            <dt className="sr-only">Due At</dt>
                            <dd className="mt-4 ">
                              {task.due_at ? task.due_at : "Free"}
                            </dd>
                          </dl>
                        </td>
                        <td className="py-6 px-8 hidden xl:table-cell">
                          <span
                            className={
                              "p-2 text-white rounded-md " +
                              TASK_STATUS_CLASS_MAP[task.assignTo.pivot.done]
                            }
                          >
                            {TASK_STATUS_TEXT_MAP[task.assignTo.pivot.done]}
                          </span>
                        </td>
                        <td className="py-6 px-8 hidden xl:table-cell">
                          {task.assignBy.fullname}
                        </td>
                        <td className="py-6 px-8 hidden xl:table-cell">
                          {task.due_at ? task.due_at : "Free"}
                        </td>
                        <td className="py-6 px-8 ">
                          <div className="h-full w-full flex justify-end">
                            <Link
                              className="rounded-full bg-beyours-1100 border-[1px] border-beyours-900 p-[4px] hover:bg-beyours-900 hover:scale-110 transition-all ease-in-out duration-300 "
                              href={route("task.show", task.id)}
                            >
                              <IconDetail className="stroke-white" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }

              </tbody>
            </table>
            {tasks.data.filter((task) =>
              searchValue
                ? task.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                : task
            ).length === 0 && (
              <div className="flex justify-center items-center w-full h-full min-h-96">
                <span
                  className="py-6 px-8 text-center text-beyours-300 italic"
                >
                  There is no task matching your search or created.
                </span>
              </div>
            )}
          </div>
          <div className="w-full flex absolute bottom-0 bg-beyours-650 border-t-beyours-600 border-t-[1px] px-6 py-4 h-20 box-border">
            <Pagination links={tasks.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
