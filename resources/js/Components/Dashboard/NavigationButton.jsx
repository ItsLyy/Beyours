import { Link } from "@inertiajs/react";

export default function NavigationButton({ children, active = false, ...props  }) {
  return (
  <Link {...props} className={"flex items-center gap-6 text-beyours-250 font-thin md:w-full p-4 box-border text-sm md:text-base " + (active ? "!text-white stroke-white" : "")}>
      {children}
    </Link>
  );
}
