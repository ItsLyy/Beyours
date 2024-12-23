import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateCharacterInformation({
  mustVerifyEmail,
  status,
  className = "",
}) {
  const character = usePage().props.auth.character;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      fullname: character.fullname,
      pkl: character.pkl,
      instructor: character.instructor,
    });

  const submit = (e) => {
    e.preventDefault();
    patch(route("character.update", {character: character.id}));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-white">Character Information</h2>

        <p className="mt-1 text-sm text-beyours-100">
          Update your character's profile information.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6 text-white">
        <div>
          <InputLabel htmlFor="fullname" value="fullname" />

          <TextInput
            id="fullname"
            className="mt-1 block w-full"
            value={data.fullname}
            onChange={(e) => setData("fullname", e.target.value)}
            required
            isFocused
            autoComplete="fullname"
          />

          <InputError className="mt-2" message={errors.username} />
        </div>

        <div>
          <InputLabel htmlFor="pkl" value="pkl" />

          <TextInput
            id="pkl"
            className="mt-1 block w-full"
            value={data.pkl}
            onChange={(e) => setData("pkl", e.target.value)}
            required
            autoComplete="pkl"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        <div>
          <InputLabel htmlFor="instructor" value="instructor" />

          <TextInput
            id="instructor"
            className="mt-1 block w-full"
            value={data.instructor}
            onChange={(e) => setData("instructor", e.target.value)}
            required
            autoComplete="instructor"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>



        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 text-sm font-medium text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
