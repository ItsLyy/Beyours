import Checkbox from "@/Components/Checkbox";
import Dialog from "@/Components/Dialog";
import IconEmail from "@/Components/Icons/IconEmail";
import IconPassword from "@/Components/Icons/Auth/IconPassword";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    input_type: "",
    password: "",
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />
      <div className="flex flex-col items-center justify-center w-full min-h-screen sm:justify-center">
        <Dialog
          title="Login"
          useFooter={true}
          footerContent={
            <p className="text-center font-thin text-sm">
              Don't have an account?{" "}
              <Link className="text-beyours-900" href={route("register")}>
                Signup
              </Link>
            </p>
          }
        >
          <form onSubmit={submit} className="text-beyours-500">
            <div>
              <TextInput
                id="input_type"
                type="input_type"
                name="input_type"
                value={data.input_type}
                className="mt-1 block w-full"
                autoComplete="email"
                placeholder="Enter you email or username"
                Icon={IconEmail}
                isFocused={true}
                onChange={(e) => setData("input_type", e.target.value)}
              />

              <InputError
                message={errors.input_type}
                className="mt-2 text-[#fff]"
              />
            </div>

            <div className="mt-4">
              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                placeholder="Enter you password"
                Icon={IconPassword}
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
              />

              <InputError
                message={errors.password}
                className="mt-2 text-[#fff]"
              />
            </div>

            <div className="mt-4 mb-14 flex justify-between">
              <label className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                />
                <span className="ms-2 text-sm text-beyours-250">
                  Remember me
                </span>
              </label>
              {canResetPassword && (
                <Link
                  href={route("password.request")}
                  className="rounded-sm text-sm text-beyours-250 hover:text-beyours-200 ease-in-out transition-all focus:outline-none focus:ring-2 focus:ring-beyours-800 focus:ring-offset-2"
                >
                  Forgot your password?
                </Link>
              )}
            </div>

            <div className="mt-4 mb-16 flex items-center justify-end">
              <PrimaryButton className="" disabled={processing}>
                Login
              </PrimaryButton>
            </div>

            {status && (
              <div className="mb-4 text-sm font-medium text-green-600">
                {status}
              </div>
            )}
          </form>
        </Dialog>
      </div>
    </GuestLayout>
  );
}
