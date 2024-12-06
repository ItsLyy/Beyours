import CommunityLayout from "@/Layouts/CommunityLayout";
import HeaderInputField from "@/Components/Dashboard/HeaderInputField";
import Dialog from "@/Components/Dialog";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import IconCharacterBanner from "@/Components/Icons/IconCharacterBanner";
import TextAreaInput from "@/Components/TextAreaInput";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import OptionInput from "@/Components/OptionInput";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Show({ community, yourCharacter, attendance }) {
  const character = usePage().props.auth.character;
  const [secondJournalImageName, setSecondJournalImageName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { data, setData, post, put, processing, errors } = useForm({
    second_journal_image: null,
    journal: attendance.journal,
    status: attendance.status,
  });

  const secondJournalImageHandler = (e) => {
    setSecondJournalImageName(e.target.value);
    setData('second_journal_image', e.target.files[0]);
  };

  const editHandler = (e) => {
    e.preventDefault();

    setIsEdit(true);
  };

  const cancelHandler = (e) => {
    e.preventDefault();

    setIsEdit(false);
  };

  const submit = (e) => {
    e.preventDefault();

    console.log(data);

    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      text: "Are you sure want to take a attendance now?",
      icon: "question",
      denyButtonText: "No",
      preConfirm: () => {
        put(route("community.attendance.update", [community.id, attendance]));
      },
    });
  };
  return (
    <CommunityLayout community={community} yourCharacter={yourCharacter}>
      <Head title="Detail"></Head>

      <div className="flex justify-center items-center w-full min-h-screen p-4 pb-24 xl:pb-4">
        <Dialog
          title="Detail attendance"
          useFooter={true}
          className="md:max-w-none md:w-[90%] md:h-5/6"
        >
          <div>
            <form
              className="flex flex-col xl:flex-row gap-4 relative"
              onSubmit={submit}
            >
              <div className="flex gap-2 w-full flex-col xl:flex-row">
                <img
                  src={
                    data.first_journal_image
                      ? URL.createObjectURL(data.first_journal_image)
                      : "/" +
                        (attendance.first_photo_path || "logo/logobeyours.svg")
                  }
                  alt="First Journal Photo"
                  className={
                    "xl:w-72 w-full box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " +
                    (data.first_journal_image || attendance.first_photo_path
                      ? "object-cover object-center"
                      : "p-20 grayscale")
                  }
                />
                <img
                  src={
                    data.second_journal_image
                      ? URL.createObjectURL(data.second_journal_image)
                      : "/" +
                        (attendance.second_photo_path || "logo/logobeyours.svg")
                  }
                  alt="Second Journal Photo"
                  className={
                    "xl:w-72 w-full box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " +
                    (data.second_journal_image || attendance.second_photo_path
                      ? "object-cover object-center"
                      : "p-20 grayscale")
                  }
                />
              </div>
              <div className="w-full max-h-[94%] overflow-y-auto p-1">
                <HeaderInputField
                  title="Journal"
                  description="Capture the essence of your activity today in a few sentences. What makes it special?"
                  className="my-4"
                  required
                />

                <div className="mt-4">
                  <TextAreaInput
                    readOnly={true}
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
                    disabled={true}
                    id="status"
                    name="status"
                    value={data.status}
                    className="block w-full"
                    autoComplete="status"
                    placeholder="Enter your attendance's status"
                    onChange={(e) => {
                      setData("status", e.target.value);
                      console.log(data.status);
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

                {character.id === attendance.character_id ? isEdit ? (
                  <>
                    <HeaderInputField
                      title="Sunset Photo"
                      description="Take your photo and share your happiness"
                      className="my-4"
                      required
                    />
                    <div>
                      <TextInput
                        id="second_journal_image"
                        type="file"
                        name="second_journal_image"
                        value={secondJournalImageName}
                        className={
                          "block w-full cursor-pointer text-beyours-500 " +
                          (secondJournalImageName ? "text-white" : "")
                        }
                        autoComplete="secondJournalImageName"
                        Icon={IconCharacterBanner}
                        onChange={secondJournalImageHandler}
                        required
                      />

                      <InputError
                        message={errors.second_journal_image}
                        className="mt-2 text-[#fff]"
                      />
                    </div>
                    <div className="mt-16 flex items-center justify-end gap-4">
                      <SecondaryButton
                        className="text-white px-3 py-4"
                        onClick={cancelHandler}
                        disabled={processing}
                      >
                        Cancel
                      </SecondaryButton>

                      <PrimaryButton
                        disabled={processing}
                        className="text-white !w-fit !h-fit"
                      >
                        Update
                      </PrimaryButton>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-end mt-8 text-white w-full h-fit">
                    <PrimaryButton
                      disabled={processing}
                      className="!w-fit"
                      onClick={editHandler}
                    >
                      Edit
                    </PrimaryButton>
                  </div>
                ) : ""}
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </CommunityLayout>
  );
}
