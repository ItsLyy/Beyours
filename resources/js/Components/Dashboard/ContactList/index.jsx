import { authenticatedData } from "@/Contexts/AuthenticatedContext";
import ContactItem from "./ContactItem";

export default function ContactList({ className, globalFriends }) {
  const { isUserOnlineHandler } = authenticatedData();
  return (
    <ul
      className={
        "bg-beyours-700 overflow-y-auto h-full rounded-md " + className
      }
    >
      {globalFriends.data.map((globalFriend) => {
        if (isUserOnlineHandler(globalFriend.id)) {
          return (
            <li key={globalFriend.id}>
              <ContactItem
                fullname={globalFriend.character.fullname}
                name={globalFriend.username}
                imageData={globalFriend.photo_profile}
              />
            </li>
          );
        }
      })}
    </ul>
  );
}
