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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Create({ defaultAvatar }) {
  const [photoProfileName, setPhotoProfileName] = useState("");
  const [characterBannerName, setCharacterBannerName] = useState("");

  const { data, setData, post, processing, errors } = useForm({
    fullname: "",
    profession: "",
    first_skill: "",
    second_skill: "",
    phone_number: "",
    address: "",
    photo_profile: "",
    character_banner: "",
    pkl: "",
    instructor: "",
  });

  const photoProfileHandler = (e) => {
    setData("photo_profile", e.target.files[0]);
    setPhotoProfileName(e.target.value);
  };

  const characterBannerHandler = (e) => {
    setData("character_banner", e.target.files[0]);
    setCharacterBannerName(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    withReactContent(Swal).fire({
      title: "Apakah anda yakin?",
      showDenyButton: true,
      confirmButtonText: "Iya",
      denyButtonText: "Tidak",
      text: "Apakah anda yakin ingin membuat karakter ini?",
      icon: "question",
      preConfirm: () => {
        post(route("character.store"));
      },
    });
  };

  return (
    <div className="bg-beyours-750 text-beyours-100">
      <Head title="Karakter" />

      <section className="w-full">
        <div className="flex justify-center items-center w-full min-h-screen p-4">
          <Dialog
            title="Membuat Karakter"
            useFooter={true}
            className="w-full md:max-w-none xl:w-3/5 md:h-5/6"
          >
            <div className="w-full">
              <form
                className="flex flex-col gap-4 relative md:flex-row"
                onSubmit={submit}
              >
                <div className="relative h-full flex justify-center mb-10">
                  <PhotoProfile
                    className="size-20 absolute -bottom-8"
                    imagePreview={data.photo_profile || null}
                    defaultImage={defaultAvatar}
                  />
                  <BannerCharacter
                    className="w-96"
                    imagePreview={data.character_banner || null}
                    defaultImage={defaultAvatar}
                  />
                </div>
                <div className="w-full h-full px-2 py-1">
                  <HeaderInputField
                    title="Nama Lengkap"
                    description="Nama ini akan ditampilkan pada saat Presensi"
                    className="mb-4"
                    required
                  />

                  <div>
                    <TextInput
                      id="fullname"
                      name="fullname"
                      value={data.fullname}
                      className="block w-full"
                      autoComplete="fullname"
                      placeholder="Masukan nama lengkap"
                      Icon={IconUser}
                      isFocused={true}
                      onChange={(e) => setData("fullname", e.target.value)}
                      required
                    />

                    <InputError
                      message={errors.fullname}
                      className="mt-2 text-[#fff]"
                    />
                  </div>

                  <HeaderInputField
                    title="Profesi"
                    description="Deskripsikan profesi atau pekerjaan anda."
                    className="my-4"
                    required
                  />

                  <div className="mt-4">
                    <TextInput
                      id="profession"
                      type="text"
                      name="profession"
                      value={data.profession}
                      className="block w-full"
                      placeholder="Masukan profesi"
                      Icon={IconProfession}
                      autoComplete="profession"
                      onChange={(e) => setData("profession", e.target.value)}
                      required
                    />

                    <InputError
                      message={errors.profession}
                      className="mt-2 text-[#fff]"
                    />
                  </div>

                  <HeaderInputField
                    title="Kemampuan"
                    description="Berikan dua kemampuan yang menggambarkan anda. Contoh: Coding, Video Editing, Swordsmanship."
                    className="my-4"
                    required
                  />

                  <div className="mt-4 flex w-full gap-4">
                    <div className="w-full">
                      <TextInput
                        id="first_skill"
                        type="text"
                        name="first_skill"
                        value={data.first_skill}
                        className="block w-full"
                        placeholder="Masukan kemampuan pertama"
                        Icon={IconSkill}
                        autoComplete="first_skill"
                        onChange={(e) => setData("first_skill", e.target.value)}
                        required
                      />

                      <InputError
                        message={errors.first_skill}
                        className="mt-2 text-[#fff]"
                      />
                    </div>

                    <div className="w-full">
                      <TextInput
                        id="second_skill"
                        type="text"
                        name="second_skill"
                        value={data.second_skill}
                        className="block w-full"
                        placeholder="Masukan kemampuan kedua"
                        Icon={IconSkill}
                        autoComplete="second_skill"
                        onChange={(e) =>
                          setData("second_skill", e.target.value)
                        }
                        required
                      />

                      <InputError
                        message={errors.second_skill}
                        className="mt-2 text-[#fff]"
                      />
                    </div>
                  </div>

                  <HeaderInputField
                    title="Detail Informasi"
                    description='Memembutuhkan informasi "Nomer Telepon: 082112341234", "Alamat: 123 Main Street".'
                    className="my-4"
                    required
                  />

                  <div className="mt-4 flex w-full gap-4">
                    <div className="w-full">
                      <TextInput
                        id="phone_number"
                        type="tel"
                        name="phone_number"
                        value={data.phone_number}
                        className="block w-full"
                        placeholder="Masukan nomer telepon"
                        Icon={IconPhone}
                        autoComplete="phone_number"
                        onChange={(e) =>
                          setData("phone_number", e.target.value)
                        }
                        required
                      />

                      <InputError
                        message={errors.phone_number}
                        className="mt-2 text-[#fff]"
                      />
                    </div>

                    <div className="w-full">
                      <TextInput
                        id="address"
                        type="text"
                        name="address"
                        value={data.address}
                        className="block w-full"
                        placeholder="Masukan alamat"
                        Icon={IconLocation}
                        autoComplete="address"
                        onChange={(e) => setData("address", e.target.value)}
                        required
                      />

                      <InputError
                        message={errors.address}
                        className="mt-2 text-[#fff]"
                      />
                    </div>
                  </div>

                  <HeaderInputField
                    title="PKL"
                    description="Tempat anda melakukan kegiatan PKL"
                    className="my-4"
                    required
                  />

                  <div>
                    <TextInput
                      id="pkl"
                      name="pkl"
                      value={data.pkl}
                      className="block w-full"
                      autoComplete="pkl"
                      placeholder="Masukan tempat pkl"
                      Icon={IconLocation}
                      isFocused={true}
                      onChange={(e) => setData("pkl", e.target.value)}
                      required
                    />

                    <InputError
                      message={errors.pkl}
                      className="mt-2 text-[#fff]"
                    />
                  </div>

                  <HeaderInputField
                    title="Instruktur"
                    description="Nama instruktuk di tempat PKL anda. Peringatan: instruktur merupakan pembimbing atau yang mengurus di masing-masing DUDI anda, berbeda dengan Guru pembimbing sekolah"
                    className="my-4"
                    required
                  />

                  <div>
                    <TextInput
                      id="instructor"
                      name="instructor"
                      value={data.instructor}
                      className="block w-full"
                      autoComplete="instructor"
                      placeholder="Masukan nama lengkap instruktur pkl"
                      Icon={IconUser}
                      isFocused={true}
                      onChange={(e) => setData("instructor", e.target.value)}
                      required
                    />

                    <InputError
                      message={errors.instructor}
                      className="mt-2 text-[#fff]"
                    />
                  </div>

                  <HeaderInputField
                    title="Foto Profil"
                    description="Foto ini akan ditampilkan di komunitas dan saat melakukan presensi"
                    className="my-4"
                    required
                  />

                  <div>
                    <TextInput
                      id="photo_profile"
                      type="file"
                      name="photo_profile"
                      value={photoProfileName}
                      className={
                        "block w-full cursor-pointer text-beyours-500" +
                        (photoProfileName ? "text-white" : "")
                      }
                      autoComplete="photo_profile"
                      Icon={IconPhotoProfile}
                      isFocused={true}
                      onChange={photoProfileHandler}
                      required
                    />

                    <InputError
                      message={errors.photo_profile}
                      className="mt-2 text-[#fff]"
                    />
                  </div>

                  <HeaderInputField
                    title="Banner Karakter"
                    description="banner ini hanya akan ditampilkan di dashboard anda"
                    className="my-4"
                    required
                  />

                  <div>
                    <TextInput
                      id="character_banner"
                      type="file"
                      name="character_banner"
                      value={characterBannerName}
                      className={
                        "block w-full cursor-pointer text-beyours-500 " +
                        (characterBannerName ? "text-white" : "")
                      }
                      autoComplete="character_banner"
                      Icon={IconCharacterBanner}
                      isFocused={true}
                      onChange={characterBannerHandler}
                      required
                    />

                    <InputError
                      message={errors.character_banner}
                      className="mt-2 text-[#fff]"
                    />
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
      </section>
    </div>
  );
}
