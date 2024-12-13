import CommunityLayout from "@/Layouts/CommunityLayout";
import HeaderInputField from "@/Components/Dashboard/HeaderInputField";
import Dialog from "@/Components/Dialog";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import IconCharacterBanner from "@/Components/Icons/IconCharacterBanner";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import OptionInput from "@/Components/OptionInput";

export default function Create({ community, character, attendance }) {
  const [firstJournalImageName, setFirstJournalImageName] = useState("");

  const { data, setData, post, processing, errors } = useForm({
    status: "present",
    first_journal_image: "",
    second_journal_image: "",
  });

  const firstJournalImageHandler = (e) => {
    setFirstJournalImageName(e.target.value);
    setData("first_journal_image", e.target.files[0]);
  };

  const submit = (e) => {
    e.preventDefault();

    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      text: "Are you sure want to take a attendance now?",
      icon: "question",
      denyButtonText: "No",
      preConfirm: () => {
        post(route("community.attendance.store", [community.id]));
      },
    });
  };
  return (
    <CommunityLayout community={community} character={character}>
      <Head title="Add Community" />

      <section className="flex justify-center items-center w-full min-h-screen p-4 pb-24 2xl:pb-4 h-full 2xl:h-screen">
        <Dialog
          title="Take a attendance"
          useFooter={true}
          className="sm:max-w-none md:w-[90%] 2xl:h-5/6"
        >
          <div className="h-full ">
            <form
              className="flex flex-col 2xl:flex-row gap-4 h-full "
              onSubmit={submit}
            >
              <div className="flex gap-2 w-full min-w-fit flex-row h-full">
                <img
                  src={
                    data.first_journal_image
                      ? URL.createObjectURL(data.first_journal_image)
                      : "/logo/logobeyours.svg"
                  }
                  alt="First Journal"
                  className={
                    "w-full 2xl:w-72 box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " +
                    (data.first_journal_image
                      ? "object-cover object-center"
                      : " grayscale")
                  }
                />
                <img
                  src={
                    data.second_journal_image
                      ? URL.createObjectURL(data.second_journal_image)
                      : "/logo/logobeyours.svg"
                  }
                  alt="Second Journal"
                  className={
                    "w-full 2xl:w-72 box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " +
                    (data.second_journal_image
                      ? "object-cover object-center"
                      : " grayscale")
                  }
                />
              </div>
              <div className="w-full h-full overflow-y-auto pb-24 p-1">
                <HeaderInputField
                  title="Status"
                  description="Select your current status: Present, Sick, or Excused."
                  className="my-4"
                  required
                />

                <div>
                  <OptionInput
                    id="status"
                    name="status"
                    value={data.status}
                    className="block w-full"
                    autoComplete="status"
                    placeholder="Enter your attendance's status"
                    onChange={(e) => {
                      setData("status", e.target.value);
                    }}
                    required
                  >
                    <option value="present">Present</option>
                    <option value="sick">Sick</option>
                    <option value="excused">Excused</option>
                  </OptionInput>

                  <InputError
                    message={errors.status}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <HeaderInputField
                  title="Capture the Moment"
                  description="Take a photo to celebrate your first attendance! A second photo can be taken during your next attendance."
                  className="my-4"
                  required
                />

                <div>
                  <TextInput
                    id="first_journal_image"
                    type="file"
                    name="first_journal_image"
                    value={firstJournalImageName}
                    className={
                      "block w-full cursor-pointer text-beyours-500 " +
                      (firstJournalImageName ? "text-white" : "")
                    }
                    autoComplete="first_journal_image"
                    Icon={IconCharacterBanner}
                    onChange={firstJournalImageHandler}
                    required
                  />

                  <InputError
                    message={errors.first_journal_image}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <div className="mt-16 flex items-center justify-end">
                  <PrimaryButton disabled={processing}>Send</PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </Dialog>
      </section>
    </CommunityLayout>
  );
}
