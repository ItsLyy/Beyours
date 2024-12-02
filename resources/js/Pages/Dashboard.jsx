import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import NoCharacter from "./Dashboard/NoCharacter";
import DashboardHome from "./Dashboard/DashboardHome";

export default function Dashboard() {
  const user = usePage().props.auth.user;
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <DashboardHome />
    </AuthenticatedLayout>
  );
}
