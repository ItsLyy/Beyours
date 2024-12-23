import HeaderInputField from "@/Components/Dashboard/HeaderInputField";
import Dialog from "@/Components/Dialog";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import IconCharacterBanner from "@/Components/Icons/IconCharacterBanner";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextAreaInput from "@/Components/TextAreaInput";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SecondaryButton from "@/Components/SecondaryButton";
import CommunityLayout from "@/Layouts/CommunityLayout";

const Edit = ({ community, logoBeyours }) => {
  console.log(community.data.id);
  const [bannerImageName, setBannerImageName] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    name: community.data.name,
    description: community.data.description,
    attendance: community.data.attendance,
    banner_image_file: "",
  });

  const bannerEventHandler = (e) => {
    setBannerImageName(e.target.value);
    setData("banner_image_file", e.target.files[0]);
  };

  const update = (e) => {
    e.preventDefault();

    withReactContent(Swal).fire({
      title: "Apakah anda yakin?",
      showDenyButton: true,
      confirmButtonText: "Iya",
      denyButtonText: "Tidak",
      text: "Apakah anda yakin ingin mengubah komunitas ini?",
      icon: "question",
      preConfirm: () => {
        post(route("community.update", { _method: 'put', community: community.data.id, }));
      },
    });

  };

  const deleteCommunityHandler = (e) => {
    e.preventDefault();

    withReactContent(Swal).fire({
      title: "Apakah anda yakin?",
      showDenyButton: true,
      confirmButtonText: "Iya",
      denyButtonText: "Tidak",
      text: "Apakah anda yakin ingin mengubah komunitas ini?",
      icon: "warning",
      preConfirm: () => {
        post(route("community.destroy", { _method: 'delete', community: community.data.id, }));
      },
    });

  };

  return (
    <>
      <Head title="Add Community" />

      <div className="flex justify-center items-center w-full min-h-screen p-4">
        <Dialog
          title="Membuat Komunitas"
          useFooter={true}
          className="md:max-w-none md:w-3/5 md:h-5/6"
        >
          <div>
            <form className="flex gap-4 relative">
              <div className="relative h-full flex justify-center mb-10"></div>
              <div className="w-full h-full px-2 py-1">
                <HeaderInputField
                  title="Name"
                  description="Nama yang unik untuk komunitas anda"
                  className="mb-4"
                  required
                />

                <div>
                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="block w-full"
                    autoComplete="name"
                    placeholder="Masukan nama komunitas"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                  />

                  <InputError
                    message={errors.name}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <HeaderInputField
                  title="Deskripsi"
                  description="Deskripsikan komunitas anda"
                  className="my-4"
                  required
                />

                <div className="mt-4">
                  <TextAreaInput
                    id="description"
                    type="text"
                    name="description"
                    value={data.description}
                    className="block w-full h-64"
                    placeholder="Enter your description"
                    autoComplete="description"
                    onChange={(e) => setData("description", e.target.value)}
                    required
                  />

                  <InputError
                    message={errors.profession}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <HeaderInputField
                  title="Banner Komunitas"
                  description="Sebuah gambar yang mewujudkan komunitas anda."
                  className="my-4"
                  required
                />

                <img
                  src={
                    data.banner_image_file
                      ? URL.createObjectURL(data.banner_image_file)
                      : community.data.banner_path || logoBeyours
                  }
                  alt="Banner Community"
                  className={
                    "w-full aspect-video mb-2 rounded-sm bg-beyours-600 box-border " +
                    (community.data.banner_path || data.banner_image_file ? "" : "p-28 grayscale")
                  }
                />

                <div>
                  <TextInput
                    id="banner_image_file"
                    type="file"
                    name="banner_image_file"
                    value={bannerImageName}
                    className={
                      "block w-full cursor-pointer text-beyours-500 " +
                      (bannerImageName ? "text-white" : "")
                    }
                    autoComplete="banner_image_file"
                    Icon={IconCharacterBanner}
                    onChange={bannerEventHandler}
                    required
                  />

                  <InputError
                    message={errors.banner_image_file}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <label htmlFor="attendance" className="cursor-pointer">
                  <div className="flex justify-between items-center">
                    <HeaderInputField
                      title="Daftar hadir"
                      description="Menyalakan fitur ini dapat membuka fitur jurnal."
                      className="my-4"
                      required
                    />
                    <input
                      type="checkbox"
                      name="attendance"
                      id="attendance"
                      onChange={(e) => setData("attendance", e.target.checked)}
                      checked={data.attendance}
                      className="rounded-full size-4 mr-4 transition-all ease-in-out duration-200 checked:bg-beyours-900 text-beyours-900 focus:ring-beyours-900 "
                    />
                  </div>
                </label>

                <div className="mt-16 flex items-center justify-end h-12 gap-4">
                  <SecondaryButton disabled={processing} onClick={deleteCommunityHandler} className="!h-full p-4 !text-beyours-900" >Hapus</SecondaryButton>
                  <PrimaryButton disabled={processing} onClick={update} className="!h-full" >Update</PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
};

Edit.layout = (page) => {
  return (
    <AuthenticatedLayout isMain={false} isSidebarOpen={false}>
      <CommunityLayout
        community={page.props.community.data}
        character={page.props.character.data}
      >
        {page}
      </CommunityLayout>
    </AuthenticatedLayout>
  );
};

export default Edit;
