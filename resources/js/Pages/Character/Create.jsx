import BannerCharacter from "@/Components/Dashboard/BannerCharacter";
import HeaderInputField from "@/Components/Dashboard/HeaderInputField";
import PhotoProfile from "@/Components/Dashboard/PhotoProfile";
import Dialog from "@/Components/Dialog";
import IconLocation from "@/Components/Icons/IconLocation";
import IconPhone from "@/Components/Icons/IconPhone";
import IconProfession from "@/Components/Icons/IconProfession";
import IconSkill from "@/Components/Icons/IconSkill";
import IconUser from "@/Components/Icons/IconUser";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import IconPhotoProfile from "@/Components/Icons/IconPhotoProfile";
import IconCharacterBanner from "@/Components/Icons/IconCharacterBanner";
import { useState } from "react";
import SweetAlert2 from 'react-sweetalert2';

export default function Create() {
  const [ photoProfileName, setPhotoProfileName ] = useState('');
  const [ characterBannerName, setCharacterBannerName ] = useState('');
  const [ swalProps, setSwalProps ] = useState({});

  const { data, setData, post, processing, errors, reset } = useForm({
    fullname: "",
    profession: "",
    first_skill: "",
    second_skill: "",
    phone_number: "",
    address: "",
    photo_profile: "",
    banner_character: "",
  });

  const photoProfileHandler = (e) => {
    setData("photo_profile", e.target.files[0]);
    setPhotoProfileName(e.target.value);
  };

  const characterBannerHandler = (e) => {
    setData("banner_character", e.target.files[0]);
    setCharacterBannerName(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    setSwalProps({
      show: true,
      title: 'Basic Usage',
      text: 'Hello World',
    });
    // post(route("character.store"));
  };

  return (
    <div className="bg-beyours-750 text-beyours-100">
      <Head title="Character" />

      <div className="flex justify-center items-center w-full min-h-screen p-4">
        <Dialog
          title="Create a character"
          useFooter={true}
          className="md:max-w-none md:w-3/5 md:h-5/6"
        >
          <div>
            <form className="flex gap-4 relative" onSubmit={submit} >
              <div className="relative h-full flex justify-center mb-10">
                <PhotoProfile className="size-20 absolute -bottom-8" imagePreview={data.photo_profile} />
                <BannerCharacter className="w-96" imagePreview={data.banner_character} />
              </div>
              <div className="w-full h-full px-2 py-1">
                <HeaderInputField title="Full Name" description="this name will displayed in the community and friend" className="mb-4" required />

                <div>
                  <TextInput
                    id="fullname"
                    name="fullname"
                    value={data.fullname}
                    className="block w-full"
                    autoComplete="fullname"
                    placeholder="Enter your full name"
                    Icon={IconUser}
                    isFocused={true}
                    onChange={(e) => setData("fullname", e.target.value)}
                    required
                  />

                  <InputError message={errors.name} className="mt-2 text-[#fff]" />
                </div>

                <HeaderInputField title="Profession" description="Describe your profession or passion and choose only one. Example: Programmer, Artist, Adventurer." className="my-4" required />

                <div className="mt-4">
                  <TextInput
                    id="profession"
                    type="text"
                    name="profession"
                    value={data.profession}
                    className="block w-full"
                    placeholder="Enter your profession"
                    Icon={IconProfession}
                    autoComplete="profession"
                    onChange={(e) => setData("profession", e.target.value)}
                    required
                  />

                  <InputError message={errors.email} className="mt-2 text-[#fff]" />
                </div>

                <HeaderInputField title="Skills" description="Add two skills that represent your abilities. Example: Coding, Video Editing, Swordsmanship." className="my-4" required />

                <div className="mt-4 flex w-full gap-4">
                  <div className="w-full">
                    <TextInput
                      id="first_skill"
                      type="text"
                      name="first_skill"
                      value={data.first_skill}
                      className="block w-full"
                      placeholder="Enter your first skill"
                      Icon={IconSkill}
                      autoComplete="first_skill"
                      onChange={(e) => setData("first_skill", e.target.value)}
                      required
                    />

                    <InputError message={errors.email} className="mt-2 text-[#fff]" />
                  </div>

                  <div className="w-full">
                    <TextInput
                      id="second_skill"
                      type="text"
                      name="second_skill"
                      value={data.second_skill}
                      className="block w-full"
                      placeholder="Enter your second skill"
                      Icon={IconSkill}
                      autoComplete="second_skill"
                      onChange={(e) => setData("second_skill", e.target.value)}
                      required
                    />

                    <InputError message={errors.email} className="mt-2 text-[#fff]" />
                  </div>
                </div>

                <HeaderInputField title="Aditional Information" description='Required details like "Phone Number: 123-456-7890", "Address: 123 Main Street".' className="my-4" required />

                <div className="mt-4 flex w-full gap-4">
                  <div className="w-full">
                    <TextInput
                      id="phone_number"
                      type="text"
                      name="phone_number"
                      value={data.phone_number}
                      className="block w-full"
                      placeholder="Enter your phone number"
                      Icon={IconPhone}
                      autoComplete="phone_number"
                      onChange={(e) => setData("phone_number", e.target.value)}
                      required
                    />

                    <InputError message={errors.email} className="mt-2 text-[#fff]" />
                  </div>

                  <div className="w-full">
                    <TextInput
                      id="address"
                      type="text"
                      name="address"
                      value={data.address}
                      className="block w-full"
                      placeholder="Enter your address"
                      Icon={IconLocation}
                      autoComplete="address"
                      onChange={(e) => setData("address", e.target.value)}
                      required
                    />

                    <InputError message={errors.email} className="mt-2 text-[#fff]" />
                  </div>
                </div>

                <HeaderInputField title="Photo Profile" description="this photo profile will displayed in the community and friend" className="my-4" required />

                <div>
                  <TextInput
                    id="photo_profile"
                    type="file"
                    name="photo_profile"
                    value={photoProfileName}
                    className={"block w-full cursor-pointer text-beyours-500" + (photoProfileName ? "text-white" : "")}
                    autoComplete="photo_profile"
                    Icon={IconPhotoProfile}
                    isFocused={true}
                    onChange={photoProfileHandler}
                    required
                  />

                  <InputError message={errors.name} className="mt-2 text-[#fff]" />
                </div>

                <HeaderInputField title="Banner Character" description="this banner character will displayed in dashboard" className="my-4" required />

                <div>
                  <TextInput
                    id="character_banner"
                    type="file"
                    name="character_banner"
                    value={characterBannerName}
                    className={"block w-full cursor-pointer text-beyours-500 " + (characterBannerName ? "text-white" : "")}
                    autoComplete="character_banner"
                    Icon={IconCharacterBanner}
                    isFocused={true}
                    onChange={characterBannerHandler}
                    required
                  />

                  <InputError message={errors.name} className="mt-2 text-[#fff]" />
                </div>

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
    </div>
  )
}
