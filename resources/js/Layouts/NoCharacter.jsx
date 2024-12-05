import IconEmail from "@/Components/Icons/IconEmail";
import PrimaryNavigationButton from "@/Components/PrimaryNavigationButton";
import { Head, usePage } from "@inertiajs/react";

export default function NoCharacter() {
  const user = usePage().props.auth.user;
  return (
    <section className="w-full h-full flex justify-center items-center">
      <Head title="Guest" />
      <div className="w-[28rem] flex flex-col items-center text-white text-center font-thin">
        <IconEmail className="!size-24 mb-8 stroke-1" />
        <h2 className="text-xl">Hey @{user.name}, you don’t have a character yet! Create one to start your adventure.</h2>
        <p className="text-beyours-400">Start completing tasks and building legacy.</p>
        <PrimaryNavigationButton href={route('character.create')} className="md:w-48 mt-8">Create a character</PrimaryNavigationButton>
      </div>
    </section>
  )
}
