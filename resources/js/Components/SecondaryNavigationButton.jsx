import { Link } from "@inertiajs/react";

export default function SecondaryNavigationButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={
        `inline-flex items-center justify-center border-[1px] border-beyours-900 rounded-sm w-full p-4 text-xs font-thin uppercase tracking-widest text-[#fff] transition duration-300 ease-in-out hover:shadow-beyours-1000 hover:shadow-sm focus:shadow-beyours-1000 focus:shadow-sm focus:outline-none focus:ring-beyours-800 active:shadow-md active:shadow-beyours-1000 ${
          disabled && "opacity-25"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </Link>
  );
}
