import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ tasks }) {
  return (
    <AuthenticatedLayout>
      <Head title="Community"/>
    </AuthenticatedLayout>
  )
}
