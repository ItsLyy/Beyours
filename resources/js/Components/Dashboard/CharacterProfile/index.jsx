import BannerCharacter from "../BannerCharacter";
import CharacterInfo from "./CharacterInfo";

export default function CharacterProfile() {
  return (
    <div className="w-80 h-fit text-white">
      <BannerCharacter />
      <CharacterInfo />
    </div>
  );
}
