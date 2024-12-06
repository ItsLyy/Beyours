import CommunityLayout from "@/Layouts/CommunityLayout";
import { Head } from "@inertiajs/react";

export default function Index({ community, yourCharacter, members }) {
  return (
    <CommunityLayout community={community} yourCharacter={yourCharacter} members={members} >
      <Head title={community.name} role={community} />


    </CommunityLayout>
  );
}
