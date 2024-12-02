import { Link } from "@inertiajs/react";

export default function PrimaryNavigationButton({
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
      <Link
          {...props}
          className={
              `inline-flex items-center justify-center bg-gradient-to-b from-beyours-900 from-0% shadow to-beyours-800 rounded-sm border-0 w-full px-4 py-4 text-xs font-thin uppercase tracking-widest text-[#fff] transition duration-300 ease-in-out hover:shadow-beyours-1000 hover:shadow-sm focus:shadow-beyours-1000 focus:shadow-sm focus:outline-none focus:ring-beyours-800 active:shadow-md active:shadow-beyours-1000 ${
                  disabled && 'opacity-25'
              } ` + className
          }
          disabled={disabled}
      >
          {children}
      </Link>
  );
}
