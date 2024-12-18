import DashboardHeader from "@/Components/Dashboard/Header";
import Sidebar from "@/Components/Dashboard/Sidebar";
import { usePage } from "@inertiajs/react";
import NoCharacter from "./NoCharacter";
import { useEffect, useState } from "react";
import { AuthenticatedProvider } from "@/Contexts/AuthenticatedContext";

export default function AuthenticatedLayout({ children, isMain = true }) {
  const character = usePage().props.auth.character;
  const [onlineUsers, setOnlineUsers] = useState({});
  const isUsersOnline = (characterId) => onlineUsers[characterId];

  useEffect(() => {
    Echo.join("online")
      .here((users) => {
        const onlineUserObj = Object.fromEntries(
          users.map((user) => [user.id, user])
        );

        setOnlineUsers((prevOnlineUsers) => {
          return { ...prevOnlineUsers, ...onlineUserObj };
        });
      })
      .joining((users) => {
        setOnlineUsers((prevOnlineUsers) => {
          const updatedUser = { ...prevOnlineUsers };
          updatedUser[users.id] = users;
          return updatedUser;
        });
      })
      .leaving((users) => {
        setOnlineUsers((prevOnlineUsers) => {
          const updatedUser = { ...prevOnlineUsers };
          delete updatedUser[users.id];
          return updatedUser;
        });
      })
      .error((error) => {
        console.log(error);
      });

    return () => Echo.leave("online");
  }, []);

  useEffect(() => {
    Echo.private(`leveling.character.${character.id}`)
      .error((error) => {
        console.log(error);
      })
      .listen("LevelCharacterEvent", (e) => {
        console.log(e.character);
      });
  }, []);

  return (
    <div className="text-white bg-beyours-750 flex">
      {character ? <Sidebar /> : ""}
      <AuthenticatedProvider isUserOnlineHandler={isUsersOnline}>
        {isMain ? (
          <main className="flex-grow relative">
            <DashboardHeader />
            {character ? children : <NoCharacter />}
          </main>
        ) : (
          children
        )}
      </AuthenticatedProvider>
    </div>
  );
}
