import { Link } from "@inertiajs/react";

export default function Pagination({ links, className }) {
  return (
    <nav className={"h-full w-full flex justify-end gap-2 " + className}>
      {links?.map((link, index) => {
        return (
          <Link
            className={
              "inline-flex justify-center items-center min-w-16 min-h-12 p-4 bg-beyours-650 border-beyours-600 border-[1px] rounded-md box-border transition-all ease-in-out duration-300 hover:bg-beyours-600 " +
              (link.active ? "bg-beyours-750 " : "") +
              (!link.url
                ? "opacity-40 cursor-not-allowed hover:bg-beyours-650 "
                : "")
            }
            key={index}
            href={link.url}
            dangerouslySetInnerHTML={{ __html: link.label }}
          ></Link>
        );
      })}
    </nav>
  );
}
