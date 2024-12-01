import { Link } from "@inertiajs/react";

export default function NavigationButton({ children, active = false, className, ...props  }) {
  return (
  <Link {...props} className={"flex items-center gap-6 text-beyours-250 font-thin md:w-full p-4 box-border text-sm md:text-base hover:text-beyours-100 hover:stroke-beyours-100 hover:bg-beyours-600 rounded-sm transition-all ease-in-out duration-300 " + (active ? "!text-white stroke-white " : "") + className}>
      {children}
    </Link>
  );
}
