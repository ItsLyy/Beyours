import Dialog from "@/Components/Dialog";
import IconEmail from "@/Components/Icons/IconEmail";
import IconPassword from "@/Components/Icons/Auth/IconPassword";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <div className="flex justify-center items-center w-full min-h-screen">
        <Dialog title="Reset Password">
          <form onSubmit={submit}>
            <div>

              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                placeholder="Enter your email"
                Icon={IconEmail}
                onChange={(e) => setData("email", e.target.value)}
              />

              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">

              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder="Enter you new password"
                isFocused={true}
                Icon={IconPassword}
                onChange={(e) => setData("password", e.target.value)}
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">


              <TextInput
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                Icon={IconPassword}
                placeholder="Enter you new password confirmation"
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
              />

              <InputError
                message={errors.password_confirmation}
                className="mt-2"
              />
            </div>

            <div className="mt-8 mb-16 flex items-center justify-end">
              <PrimaryButton disabled={processing}>
                Reset Password
              </PrimaryButton>
            </div>
          </form>
        </Dialog>
      </div>
    </GuestLayout>
  );
}
