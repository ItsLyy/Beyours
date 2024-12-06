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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Create() {
  const [bannerImageName, setBannerImageName ] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    attendance: false,
    banner_image_file: "",
  })

  const bannerEventHandler = (e) => {
    setBannerImageName(e.target.value);
    setData("banner_image_file", e.target.files[0]);
  }

  const submit = (e) => {
    e.preventDefault();

    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: "Are ypu sure to want create a community?",
      icon: "question",
      denyButtonText: 'No',
      preConfirm: () => {
        post(route("community.store"));
      },
    })
  }

  return (
    <AuthenticatedLayout>
      <Head title="Add Community" />

      <div className="flex justify-center items-center w-full min-h-screen p-4">
        <Dialog
          title="Create a community"
          useFooter={true}
          className="md:max-w-none md:w-3/5 md:h-5/6"
        >
          <div>
            <form className="flex gap-4 relative" onSubmit={submit} >
              <div className="relative h-full flex justify-center mb-10">

              </div>
              <div className="w-full h-full px-2 py-1">
                <HeaderInputField title="Name" description="A unique name that represents your community in style. Let it stand out in the crowd!" className="mb-4" required />

                <div>
                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="block w-full"
                    autoComplete="name"
                    placeholder="Enter your community's name"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                  />

                  <InputError message={errors.name} className="mt-2 text-[#fff]" />
                </div>

                <HeaderInputField title="Description" description="Capture the essence of your community in a few sentences. What makes it special?" className="my-4" required />

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

                  <InputError message={errors.profession} className="mt-2 text-[#fff]" />
                </div>

                <HeaderInputField title="Banner Community" description="A visual masterpiece! This banner will shine in the community overview and list. Choose wisely." className="my-4" required />

                <img src={data.banner_image_file ? URL.createObjectURL(data.banner_image_file) : "/logo/logobeyours.svg"} alt="Banner Community" className={"w-full aspect-video mb-2 rounded-sm bg-beyours-600 box-border " + (data.banner_image_file ? "" : "p-28 grayscale")} />

                <div>
                  <TextInput
                    id="banner_image_file"
                    type="file"
                    name="banner_image_file"
                    value={bannerImageName}
                    className={"block w-full cursor-pointer text-beyours-500 " + (bannerImageName ? "text-white" : "")}
                    autoComplete="banner_image_file"
                    Icon={IconCharacterBanner}
                    onChange={bannerEventHandler}
                    required
                  />

                  <InputError message={errors.banner_image_file} className="mt-2 text-[#fff]" />
                </div>

                <label htmlFor="attendance">
                  <div className="flex justify-between items-center">
                    <HeaderInputField title="Attendance" description="Enable this feature to track members' participation in your community events seamlessly." className="my-4" required />
                    <input type="checkbox" name="attendance" id="attendance" onChange={(e) => setData('attendance', e.target.checked)} className="rounded-full size-4 mr-4 transition-all ease-in-out duration-200 checked:bg-beyours-900 text-beyours-900 focus:ring-beyours-900 " />
                  </div>
                </label>

                <div className="mt-16 flex items-center justify-end">
                  <PrimaryButton disabled={processing}>
                    Register
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </AuthenticatedLayout>
  )
}
