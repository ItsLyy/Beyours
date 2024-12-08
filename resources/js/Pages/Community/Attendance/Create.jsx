import CommunityLayout from "@/Layouts/CommunityLayout";
import HeaderInputField from "@/Components/Dashboard/HeaderInputField";
import Dialog from "@/Components/Dialog";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import IconCharacterBanner from "@/Components/Icons/IconCharacterBanner";
import TextAreaInput from "@/Components/TextAreaInput";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import OptionInput from "@/Components/OptionInput";

export default function Create({ community, character, attendance }) {
  const [firstJournalImageName, setFirstJournalImageName] = useState("");
  const [secondJournalImageName, setSecondJournalImageName] = useState("");

  const { data, setData, post, processing, errors } = useForm({
    status: "present",
    journal: "",
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
    <CommunityLayout community={community} character={character} >
      <Head title="Add Community" />

      <div className="flex justify-center items-center w-full min-h-screen p-4 pb-24 xl:pb-4 h-full">
        <Dialog
          title="Take a attendance"
          useFooter={true}
          className="md:max-w-none md:w-[90%] md:h-5/6"
        >
          <div className="h-full ">
            <form className="flex flex-col xl:flex-row gap-4 relative h-full " onSubmit={submit}>
              <div className="flex gap-2 w-full flex-col xl:flex-row h-full">
                <img
                  src={  data.first_journal_image ? URL.createObjectURL(data.first_journal_image) : "/logo/logobeyours.svg"}
                  alt="First Journal Photo"
                  className={"xl:w-72 w-full box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " + (data.first_journal_image ? "object-cover object-center" : "p-20 grayscale")}
                />
                <img
                  src={  data.second_journal_image ? URL.createObjectURL(data.second_journal_image) : "/logo/logobeyours.svg"}
                  alt="Second Journal Photo"
                  className={"xl:w-72 w-full box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " + (data.second_journal_image ? "object-cover object-center" : "p-20 grayscale")}
                />
              </div>
              <div className="w-full h-full overflow-y-auto pb-24 p-1">
                <HeaderInputField
                  title="Journal"
                  description="Capture the essence of your activity today in a few sentences. What makes it special?"
                  className="my-4"
                  required
                />

                <div className="mt-4">
                  <TextAreaInput
                    id="journal"
                    type="text"
                    isFocused={true}
                    name="journal"
                    value={data.journal}
                    className="block w-full h-64"
                    placeholder="Enter your journal"
                    autoComplete="journal"
                    onChange={(e) => setData("journal", e.target.value)}
                    required
                  />

                  <InputError
                    message={errors.profession}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <HeaderInputField
                  title="Status"
                  description="What is your status now copy!!"
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
                    <option value="occupied">Occupied</option>
                  </OptionInput>

                  <InputError
                    message={errors.status}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <HeaderInputField
                  title="Morning Photo"
                  description="Take your photo and share your happiness"
                  className="my-4"
                  required
                />

                <div>
                  <TextInput
                    id="first_journal_image"
                    type="file"
                    name="first_journal_image"
                    value={firstJournalImageName}
                    className={"block w-full cursor-pointer text-beyours-500 " + (firstJournalImageName ? "text-white" : "")}
                    autoComplete="first_journal_image"
                    Icon={IconCharacterBanner}
                    onChange={firstJournalImageHandler}
                    required
                  />

                  <InputError message={errors.first_journal_image} className="mt-2 text-[#fff]" />
                </div>

                <div className="mt-16 flex items-center justify-end">
                  <PrimaryButton disabled={processing}>
                    Send
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </CommunityLayout>
  );
}
