import Dialog from "@/Components/Dialog";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="flex justify-center items-center w-full min-h-screen">
        <Dialog
          title="Reset Password">
          <div className="mb-4 text-base text-beyours-100">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </div>

          {status && (
            <div className="mb-4 text-sm font-medium text-green-600">
              {status}
            </div>
          )}

          <form onSubmit={submit}>
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              isFocused={true}
              onChange={(e) => setData("email", e.target.value)}
            />

            <InputError message={errors.email} className="mt-2" />

            <div className="mt-4 mb-10 flex items-center justify-end">
              <PrimaryButton disabled={processing}>
                Email Password Reset Link
              </PrimaryButton>
            </div>
          </form>
        </Dialog>
      </div>
    </GuestLayout>
  );
}
