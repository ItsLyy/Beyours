import Card from "@/Components/Dashboard/Card";
import HeaderSection from "@/Components/Dashboard/HeaderSection";
import SearchBar from "@/Components/Dashboard/SearchBar";
import IconAdd from "@/Components/Icons/IconAdd";
import IconSearch from "@/Components/Icons/IconSearch";
import PrimaryNavigationButton from "@/Components/PrimaryNavigationButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ communities }) {
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Task" />

      <div className="flex flex-col gap-4 pb-26 w-full py-16 md:h-full md:pb-0">
        {/* Header */}
        <div className="flex justify-between items-center p-2 border-b-beyours-600 border-b-[1px]">
          <HeaderSection title="Community" subTitle="All communitites you joined" />
          <PrimaryNavigationButton
            href={route("community.create")}
            className="!w-fit !h-fit !p-[.5rem]"
          >
            <IconAdd className="size-5" />
          </PrimaryNavigationButton>
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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="w-full">

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
