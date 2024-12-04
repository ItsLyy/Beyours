export default function CharacterBody({ className, character }) {
  return (
    <table className={className}>
      <tbody>
        <tr>
          <td className="text-beyours-400 w-24 block">Profession</td>
          <td>: {character.profession}</td>
        </tr>
        <tr>
          <td className="text-beyours-400 w-24 block">Skill</td>
          <td>: { `${character.skills[3].name}, ${character.skills[4].name}` }</td>
        </tr>
      </tbody>
    </table>
  );
}
