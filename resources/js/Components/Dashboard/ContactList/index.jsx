import ContactItem from "./ContactItem";

export default function ContactList({ className, globalFriends }) {
  return (
    <ul
      className={
        "bg-beyours-700 overflow-y-auto h-full rounded-md " + className
      }
    >
      {globalFriends.data.map((globalFriend) => {
        if (globalFriend.character)
          return (
            <li key={globalFriend.id}>
              <ContactItem
                fullname={globalFriend.character.fullname}
                name={globalFriend.name}
                imageData={globalFriend.photo_profile}
              />
            </li>
          );
      })}
    </ul>
  );
}
