import IconLogout from "@/Components/Icons/Sidebar/IconLogout";
import NavigationButton from "../NavigationButton";
import NavigationLabel from "../NavigationLabel";

export default function SidebarFooter({ role, token }) {
  return (
    <div className="flex justify-center items-center flex-col w-full md:h-24 md:bg-[#161616] md:border-t-[.5px] md:border-t-beyours-600 box-border">
      <h2 className="text-nowrap text-center text-2xl mb-2 text-white font-normal leading-tight w-full uppercase tracking-widest">
        {role}
      </h2>
      <p className="text-beyours-100 text-xs">
        T O K E N : <span className="text-white">{token}</span>
      </p>
    </div>
  );
}
