import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ task }) {
  console.log(task);
  return (
    <AuthenticatedLayout>
      <section className={"h-screen w-full p-8"}>
        <Head title="Detail" />

        <div className="h-full w-full flex justify-center items-center">
          <div className="bg-beyours-700 w-[30rem] rounded-md p-8">
            <h2 className="mb-12 text-2xl">Task Detail</h2>
            <div className="mb-4">
              <p className="text-white">Title : </p>
              <p className="text-beyours-200 text-lg">{task.data.title}</p>
            </div>
            <div className="mb-4">
              <p className="text-white">Description : </p>
              <p className="text-beyours-200 text-lg">
                {task.data.description}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-white">Assign By : </p>
              <p className="text-beyours-200 text-lg">
                {task.data.assignBy.fullname}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-white">Status : </p>
              <p
                className={
                  "w-fit py-1 px-2 rounded-md text-lg " +
                  TASK_STATUS_CLASS_MAP[task.data.assignTo.pivot.done]
                }
              >
                {TASK_STATUS_TEXT_MAP[task.data.assignTo.pivot.done]}
              </p>
            </div>
            <div className="flex justify-center">
              {task.data.assignTo.pivot.done ? (
                <Link
                  className="px-6 py-3 bg-red-900 rounded-md inline-block box-border mt-6"
                  href={route("task.destroy", [task.data.id])}
                  method="delete"
                  as="button"
                >
                  Delete
                </Link>
              ) : (
                <Link
                  className="px-6 py-3 bg-beyours-800 rounded-md inline-block box-border mt-6"
                  href={route("task.done", [task.data.id])}
                  method="post"
                  as="button"
                >
                  Done
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
