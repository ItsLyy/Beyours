import ApplicationLogo from "@/Components/ApplicationLogo";
import Sidebar from "@/Components/Dashboard/Sidebar";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen bg-beyours-750">
      <Sidebar />
      {/* <main>{children}</main> */}
    </div>
  );
}
