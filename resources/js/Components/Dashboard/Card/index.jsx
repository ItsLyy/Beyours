import { Link } from "@inertiajs/react";

export default function Card({ href, title, owner, bannerPath, memberCount }) {
  return (
    <div className="flex flex-col w-auto h-fit rounded-md overflow-hidden bg-beyours-700 border-[1px] border-beyours-600">
      <div className="w-full h-fit">
        <img
          className="aspect-video object-cover object-center w-full"
          src={bannerPath || "images/defaultavatar.png"}
          alt=""
        />
      </div>
      <div className="w-full h-full flex-1 p-3 box-border relative">
        <Link href={href}>
          <h3>{title}</h3>
        </Link>
        <p className="text-beyours-250">by {owner}</p>
        <p className="text-beyours-250">
          <span className="text-white">{memberCount || 0}</span> Members
        </p>
      </div>
    </div>
  );
}
