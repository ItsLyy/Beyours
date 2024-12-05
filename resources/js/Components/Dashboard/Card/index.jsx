import { Link } from "@inertiajs/react";

export default function Card() {
  return (
    <Link className="flex flex-col w-auto h-fit rounded-md overflow-hidden bg-beyours-700 border-[1px] border-beyours-600">
      <div className="w-full h-fit">
        <img
          className="aspect-video object-cover object-center w-full"
          src="storage/images/defaultavatar.png"
          alt=""
        />
      </div>
      <div className="w-full h-full flex-1 p-3 box-border relative">
        <h3>Classroom XII RPL 2 Homeroom Teacher</h3>
        <p className="text-beyours-250">by @hari</p>
        <p className="text-beyours-250">
          <span className="text-white">36</span> Member
        </p>
      </div>
    </Link>
  );
}
