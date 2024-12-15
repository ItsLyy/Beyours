import PhotoProfile from "@/Components/Dashboard/PhotoProfile";
import CommunityLayout from "@/Layouts/CommunityLayout";
import { Head } from "@inertiajs/react";

export default function Index({
  community,
  character,
  members,
  ownerCommunity,
}) {
  return (
    <CommunityLayout community={community.data} character={character.data}>
      <Head title={community.data.name} />

      <section className="h-screen w-full p-8 flex flex-col gap-4">
        <div className="w-full h-3/5 rounded-md overflow-hidden border-[1px] border-beyours-550">
          <img
            className="h-full w-full object-cover object-center opacity-45"
            src={"/" + community.data.banner_path}
            alt="Banner Community"
          />
        </div>
        <div className="w-full grow flex">
          <div className="bg-beyours-700 rounded-md h-full w-96 p-6 border-[1px] border-beyours-550">
            <div className="border-b-[1px] border-b-beyours-600 pb-4 flex gap-4 items-center box-border">
              <div>
                <PhotoProfile
                  imageData={ownerCommunity.data.photo_profile}
                  className="size-20"
                />
              </div>
              <div className="overflow-hidden ">
                <p className="text-white text-xl text-nowrap text-ellipsis overflow-hidden">
                  {ownerCommunity.data.fullname}
                </p>
                <p className="text-beyours-450 text-sm">
                  {ownerCommunity.data.email} -{" "}
                  {ownerCommunity.data.phone_number}
                </p>
              </div>
            </div>
            <div className="px-2 py-4 text-beyours-200">
              <p className="text-white">
                Description :
                <span className="line-clamp-4 text-beyours-350 text-sm py-1">
                  {community.data.description} dawdjh akdhwaiud hawidhw aduhaw
                  dhwaid hwaiudh audhwaiuf hawfhiawufh aiudhawu hdawiu hdauhd
                  audhawuhdwahdudawui hdwah dwuadiua dhwadui hawdiu ahwduhi adui
                  ahdiuaw hdwauhdiwau hdawuhdiwaudh awudhauw dawi hwiaudha
                  iudhawiudh aiwudhawiudawhuid
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </CommunityLayout>
  );
}
