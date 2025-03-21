import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

const Edit = ({ mustVerifyEmail, status }) => {
  return (
    <>
      <Head title="Profile" />

      <div className="py-12 pb-24 xl:pb-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="bg-beyours-700 p-4 shadow sm:rounded-lg sm:p-8">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="bg-beyours-700 p-4 shadow sm:rounded-lg sm:p-8">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="bg-beyours-700 p-4 shadow sm:rounded-lg sm:p-8">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </>
  );
};

Edit.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default Edit;
