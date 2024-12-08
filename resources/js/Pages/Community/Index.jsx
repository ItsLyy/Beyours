import Card from "@/Components/Dashboard/Card";
import HeaderSection from "@/Components/Dashboard/HeaderSection";
import SearchBar from "@/Components/Dashboard/SearchBar";
import IconAdd from "@/Components/Icons/IconAdd";
import IconInCommunity from "@/Components/Icons/IconInCommunity";
import IconSearch from "@/Components/Icons/IconSearch";
import PrimaryNavigationButton from "@/Components/PrimaryNavigationButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Index({ communities }) {
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState('');

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const joinHandler = (e) => {
    e.preventDefault();
    withReactContent(Swal).fire({
      title: "Get token community",
      text: "Get token from the owner's community so you can join with the token",
      input: 'text',
      icon: 'info',
      inputValue,
      preConfirm: (inputValue) => {
        if (!inputValue) {
          Swal.showValidationMessage("Token is required");
          return false;
        }

        const url = route("community.join", inputValue);
        return url;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Use the generated URL to send a POST request
        axios.post(result.value).then((response) => {
          Swal.fire("Success", "You have joined the community!", "success");
          route('community.index');
        }).catch((error) => {
          Swal.fire("Error", "Failed to join the community.", "error");
        });
      }
    });
  }

  return (
    <AuthenticatedLayout>
      <Head title="Community" />

      <div className="flex flex-col gap-4 pb-26 w-full py-16 md:h-full md:pb-0">
        {/* Header */}
        <div className="flex justify-between items-center p-2 border-b-beyours-600 border-b-[1px]">
          <HeaderSection title="Community" subTitle="All communitites you joined" />
          <div className="flex gap-3">
            <SecondaryButton onClick={joinHandler} className="!w-fit !h-fit !p-[.5rem]">
              <IconInCommunity className="size-5 stroke-beyours-900" />
            </SecondaryButton>
            <PrimaryNavigationButton
              href={route("community.create")}
              className="!w-fit !h-fit !p-[.5rem]"
            >
              <IconAdd className="size-5" />
            </PrimaryNavigationButton>
          </div>

        </div>
        {/* Searchbar */}
        <div className="flex w-full">
          <SearchBar
            className="w-full"
            placeholder="Search for communities"
            Icon={IconSearch}
            eventHandler={searchHandler}
          />
        </div>
        {/* Content */}
        <div className="w-full grid px-2 gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            communities.data.filter(community => searchValue ? community.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) : community)
              .map(community =>
              <Card
                key={community.id}
                title={community.name}
                bannerPath={community.banner_path}
                memberCount={community.members.length}
                owner={
                  community.members.filter(member => member.role === 'owner').map(member => member.fullname)
                }
                href={route('community.show', community.id)}
              />)
          }
        </div>
        {communities.data.filter((community) =>
              searchValue
                ? community.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                : community
            ).length === 0 && (
              <div className="flex justify-center items-center w-full h-full min-h-96">
                <span
                  className="py-6 px-8 text-center text-beyours-300 italic"
                >
                  There is no community matching your search or joined.
                </span>
              </div>
            )}
        <div className="w-full">

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
