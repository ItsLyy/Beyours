import Dialog from "@/Components/Dialog";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("password.confirm"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <div className="flex justify-center items-center w-full min-h-screen">
        <Dialog title="Confirm Password">
          <div className="mb-4 text-base text-beyours-100">
            This is a secure area of the application. Please confirm your
            password before continuing.
          </div>

          <form onSubmit={submit}>
            <div className="mt-4">
              <InputLabel htmlFor="password" value="Password" />

              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData("password", e.target.value)}
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center justify-end">
              <PrimaryButton disabled={processing}>Confirm</PrimaryButton>
            </div>
          </form>
        </Dialog>
      </div>
    </GuestLayout>
  );
}
