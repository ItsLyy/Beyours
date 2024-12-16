import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ task }) {
  console.log(task);
  return (
    <AuthenticatedLayout>
      <section className={"h-screen w-fit "}>
        <Head title="Detail" />

        <div className="bg-beyours-700 h-full w-96"></div>

        {/* <Link
          className="p-4 bg-beyours-550 rounded-md inline-block box-border m-4"
          href={route("task.destroy", [task.id])}
          method="delete"
        >
          Done
        </Link> */}
      </section>
    </AuthenticatedLayout>
  );
}
