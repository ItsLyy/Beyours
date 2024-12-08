import CommunityLayout from "@/Layouts/CommunityLayout";
import { Head } from "@inertiajs/react";

export default function Index({ community, character }) {
  return (
    <CommunityLayout community={community.data} character={character.data} >
      <Head title={community.name} />


    </CommunityLayout>
  );
}
