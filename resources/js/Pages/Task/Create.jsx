import HeaderInputField from "@/Components/Dashboard/HeaderInputField";
import Dialog from "@/Components/Dialog";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextAreaInput from "@/Components/TextAreaInput";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import OptionInput from "@/Components/OptionInput";

export default function Create({ skills }) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    due_at: "",
    category: "none",
    difficult: "easy",
  });

  const submit = (e) => {
    e.preventDefault();

    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      text: "Are you sure to want create a task?",
      icon: "question",
      denyButtonText: "No",
      preConfirm: () => {
        post(route("task.store"));
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Add Community" />

      <section className="flex justify-center items-center w-full min-h-screen p-4 py-24 sm:py-4">
        <Dialog
          title="Create a task"
          useFooter={true}
          className="md:max-w-none md:w-3/5 md:h-5/6"
        >
          <div>
            <form className="flex gap-4 relative" onSubmit={submit}>
              <div className="w-full h-full px-2 py-1">
                <HeaderInputField
                  title="Title"
                  description="A unique task that represents your abilty in style. Let it stand out in the crowd!"
                  className="mb-4"
                  required
                />

                <div>
                  <TextInput
                    id="title"
                    name="title"
                    value={data.title}
                    className="block w-full"
                    autoComplete="title"
                    placeholder="Enter your task's title"
                    onChange={(e) => setData("title", e.target.value)}
                    isFocused
                    required
                  />

                  <InputError
                    message={errors.title}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <HeaderInputField
                  title="Description"
                  description="Capture the essence of your task in a few sentences. What makes it special?"
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
                    message={errors.description}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <HeaderInputField
                  title="Due at"
                  description="Make this more chalange your kind"
                  className="my-4"
                  required
                />

                <div className="mt-4">
                  <TextInput
                    id="due_at"
                    name="due_at"
                    type="date"
                    value={data.due_at}
                    className="block w-full"
                    autoComplete="due_at"
                    placeholder="Enter your task's due_at"
                    onChange={(e) => setData("due_at", e.target.value)}
                    required
                  />

                  <InputError
                    message={errors.due_at}
                    className="mt-2 text-[#fff]"
                  />
                </div>
                <HeaderInputField
                  title="Category"
                  description="What is your skill to handle this challenge"
                  className="my-4"
                  required
                />

                <div className="mt-4">
                  <OptionInput
                    id="category"
                    name="category"
                    type="date"
                    value={data.category}
                    className="block w-full"
                    autoComplete="category"
                    placeholder="Enter your task's category"
                    onChange={(e) => setData("category", e.target.value)}
                    required
                  >
                    <option value="none">None</option>
                    <option value={skills[3].name}>{skills[3].name}</option>
                    <option value={skills[4].name}>{skills[4].name}</option>
                  </OptionInput>

                  <InputError
                    message={errors.category}
                    className="mt-2 text-[#fff]"
                  />
                </div>
                <HeaderInputField
                  title="Dificult"
                  description="Chalange your self with high risk, high reward"
                  className="my-4"
                  required
                />

                <div className="mt-4">
                  <OptionInput
                    id="difficult"
                    name="difficult"
                    type="date"
                    value={data.difficult}
                    className="block w-full"
                    autoComplete="difficult"
                    placeholder="Enter your task's difficult"
                    onChange={(e) => setData("difficult", e.target.value)}
                    required
                  >
                    <option value="easy">Easy</option>
                    <option value="normal">Normal</option>
                    <option value="hard">Hard</option>
                  </OptionInput>

                  <InputError
                    message={errors.difficult}
                    className="mt-2 text-[#fff]"
                  />
                </div>

                <div className="mt-16 flex items-center justify-end">
                  <PrimaryButton disabled={processing}>Add</PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </Dialog>
      </section>
    </AuthenticatedLayout>
  );
}
