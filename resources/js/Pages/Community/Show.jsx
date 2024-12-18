import PhotoProfile from "@/Components/Dashboard/PhotoProfile";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CommunityLayout from "@/Layouts/CommunityLayout";
import { Head } from "@inertiajs/react";

const Show = ({ community, ownerCommunity }) => {
  return (
    <>
      <Head title={community.data.name} />

      <section className="h-screen w-full px-2 py-24 md:p-4">
        <div className="flex flex-col gap-4 w-full h-full">
          <div className="w-full flex">
            <div className="bg-beyours-700 overflow-hidden flex flex-col-reverse rounded-md w-full border-[1px] border-beyours-550 lg:flex-row">
              <div className="p-8 w-full lg:w-[40rem]">
                <div className="border-b-[1px] border-b-beyours-600  pb-4 flex gap-4 items-center box-border">
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
                      {community.data.description}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full relative lg:border-l-[1px] lg:border-l-beyours-550">
                <img
                  className="h-full w-full object-cover object-center opacity-15 "
                  src={"/" + community.data.banner_path}
                  alt="Banner Community"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full h-3/5 rounded-md overflow-hidden border-[1px] border-beyours-550">
            <div className="flex-1 w-full h-full bg-beyours-700 border-r-[1px] border-r-beyours-550"></div>
            <div className="flex-1 w-full h-full"></div>
          </div>
        </div>
      </section>
    </>
  );
};

Show.layout = (page) => {
  return (
    <AuthenticatedLayout isMain={false}>
      <CommunityLayout
        community={page.props.community.data}
        character={page.props.character.data}
      >
        {page}
      </CommunityLayout>
    </AuthenticatedLayout>
  );
};

export default Show;
