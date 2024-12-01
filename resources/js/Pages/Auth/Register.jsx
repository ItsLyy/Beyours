import Dialog from "@/Components/Dialog";
import IconEmail from "@/Components/Icons/Auth/IconEmail";
import IconPassword from "@/Components/Icons/Auth/IconPassword";
import IconUser from "@/Components/Icons/IconUser";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <div className="flex justify-center items-center w-full min-h-screen">
        <Dialog
          title="Signup"
          useFooter={true}
          footerContent={
            <p className="text-center font-thin text-sm">
              Already have an account?{" "}
              <Link className="text-beyours-900" href={route("login")}>
                Login
              </Link>
            </p>
          }
        >
          <form onSubmit={submit}>
            <div>
              <TextInput
                id="name"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                autoComplete="name"
                placeholder="Enter your username"
                Icon={IconUser}
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
                required
              />

              <InputError message={errors.name} className="mt-2 text-[#fff]" />
            </div>

            <div className="mt-4">
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                placeholder="Enter your email"
                Icon={IconEmail}
                autoComplete="username"
                onChange={(e) => setData("email", e.target.value)}
                required
              />

              <InputError message={errors.email} className="mt-2 text-[#fff]" />
            </div>

            <div className="mt-4">
              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                placeholder="Enter your password"
                Icon={IconPassword}
                autoComplete="new-password"
                onChange={(e) => setData("password", e.target.value)}
                required
              />

              <InputError
                message={errors.password}
                className="mt-2 text-[#fff]"
              />
            </div>

            <div className="mt-4">
              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                placeholder="Enter your password confirmation"
                autoComplete="new-password"
                Icon={IconPassword}
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                required
              />

              <InputError
                message={errors.password_confirmation}
                className="mt-2"
              />
            </div>

            <div className="mt-16 flex items-center justify-end">
              <PrimaryButton disabled={processing}>
                Register
              </PrimaryButton>
            </div>
          </form>
        </Dialog>
      </div>
    </GuestLayout>
  );
}
