export default function SidebarHeader({ bannerPath, title }) {
  return (
    <div className="hidden relative w-full bg-[#161616] border-b-[.5px] border-b-beyours-600 box-border md:block md:after:absolute md:after:top-0 md:after:left-0 md:after:w-full md:after:h-full md:after:bg-gradient-to-t md:after:from-[#c4c4c540]">
      <img src={'/' + (bannerPath || 'images/defaultavatar.png')} alt="" className="aspect-video w-full bg-beyours-650" />
      <h2
        className="text-white line-clamp-1 text-xl text-nowrap font-normal leading-tight absolute bottom-0 m-4 z-10 "
      >
        {title}
      </h2>
    </div>
  );
}
