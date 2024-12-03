import { usePage } from "@inertiajs/react"

export default function CharacterHeader({ className }) {
  const character = usePage().props.auth.character;
  return (
    <div className={"flex justify-between items-end " + className}>
      <span className="text-2xl">{ character.fullname }</span>
      <span className="text-sm text-beyours-400">Level { character.level || 0 }</span>
    </div>
  )
}
