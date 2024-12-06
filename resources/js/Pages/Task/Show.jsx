import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ task }) {
  return (
    <AuthenticatedLayout>
      <div
        className={
          "flex justify-center h-fit w-fit overflow-y-scroll "
        }
      >
        <Head title="Detail"/>
        <table className="border-collapse table-fixed w-fit bg-beyours-700 rounded-md p-4 border-[1px] border-beyours-550">
          <tbody className="text-white">
            <tr>
              <td className="py-4 px-8 border-beyours-550 border-[1px] xl:w-[20%]">Title</td>
              <td className="py-4 px-8">{task.data.tasks.title}</td>
            </tr>
            <tr>
              <td className="py-4 px-8 border-beyours-550 border-[1px]">Description</td>
              <td className="py-4 px-8">{task.data.tasks.description}</td>
            </tr>
            <tr>
              <td className="py-4 px-8 border-beyours-550 border-[1px]">Due at</td>
              <td className="py-4 px-8">{task.data.tasks.due_at}</td>
            </tr>
            <tr>
              <td className="py-4 px-8 border-beyours-550 border-[1px]">Assign By</td>
              <td className="py-4 px-8">{task.data.tasks.assignBy.fullname}</td>
            </tr>
            <tr>
              <td className="py-4 px-8 border-beyours-550 border-[1px]">Assign To</td>
              <td className="py-4 px-8">{task.data.assignTo.fullname}</td>
            </tr>
            <tr>
              <td className="py-4 px-8 border-beyours-550 border-[1px]">Status</td>
              <td className="p-8" > <span className={TASK_STATUS_CLASS_MAP[task.data.done] + ' p-2 text-white rounded-md'}>{TASK_STATUS_TEXT_MAP[task.data.done]}</span></td>
            </tr>
          </tbody>
        </table>

      </div>
      <Link
        className="p-4 bg-beyours-550 rounded-md inline-block box-border m-4"
          href={route('task.destroy', [task.data])} method="delete">
            Done
          </Link>
    </AuthenticatedLayout>
  );
}
