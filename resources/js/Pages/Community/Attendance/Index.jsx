import HeaderSection from "@/Components/Dashboard/HeaderSection";
import PhotoProfile from "@/Components/Dashboard/PhotoProfile";
import IconAdd from "@/Components/Icons/IconAdd";
import IconDetail from "@/Components/Icons/IconDetail";
import PrimaryNavigationButton from "@/Components/PrimaryNavigationButton";
import {
  ATTENDANCE_STATUS_CLASS_MAP,
  ATTENDANCE_STATUS_TEXT_MAP,
  ATTENDANCE_VERIFY_CLASS_MAP,
  ATTENDANCE_VERIFY_TEXT_MAP,
} from "@/constant";
import CommunityLayout from "@/Layouts/CommunityLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({
  community,
  yourCharacter,
  members,
  attendanceDatas,
}) {
  console.log(attendanceDatas);
  return (
    <CommunityLayout
      community={community}
      yourCharacter={yourCharacter}
      members={members}
    >
      <Head title="Attendance" />

      <section className="w-full h-full box-border text-white flex justify-center items-center flex-col p-8">
        <div className="flex justify-between items-center p-2 border-b-beyours-600 border-b-[1px] w-full mb-4">
          <HeaderSection
            title="Attendance List"
            subTitle="Take any attendance every morning and afternoon"
          />
          <PrimaryNavigationButton
            href={route("community.attendance.create", community.id)}
            className="!w-fit !h-fit !p-[.5rem]"
          >
            <IconAdd className="size-5" />
          </PrimaryNavigationButton>
        </div>
        <div className="w-full h-4/5 box-border bg-beyours-700 rounded-md relative">
          <div className="w-full max-h-full overflow-y-auto block">
            <table className="w-full h-full table-fixed border-collapse">
              <thead className="border-b-[2px] h-12 border-b-beyours-600 bg-beyours-650 sticky top-0">
                <tr className="h-16">
                  <th className="py-6 px-8 text-start font-normal">Name</th>
                  <th className="py-6 px-8 text-start font-normal hidden xl:table-cell">
                    Status
                  </th>
                  <th className="py-6 px-8 text-start font-normal hidden xl:table-cell">
                    Time
                  </th>
                  <th className="py-6 px-8 text-start font-normal hidden xl:table-cell">
                    Verified
                  </th>
                  <th className="py-6 px-8 text-end w-40 font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-beyours-150">
                {attendanceDatas.data ? attendanceDatas.data.map((attendanceData) => {
                  return (
                    <tr
                      className="border-b-[1px] border-b-beyours-600"
                      key={attendanceData.id || 0}
                    >
                      <td className="py-6 px-8 ">
                        <div className="flex items-center gap-4 text-white">
                          <PhotoProfile
                            className="size-12"
                            imageData={attendanceData.user.photo_profile || ''}
                          />
                          {attendanceData.fullname || ''}
                        </div>
                      </td>
                      <td className="py-6 px-8 ">
                        <span
                          className={
                            "text-white px-3 py-2 rounded-md " +
                            ATTENDANCE_STATUS_CLASS_MAP[attendanceData.status]
                          }
                        >
                          {ATTENDANCE_STATUS_TEXT_MAP[attendanceData.status]}
                        </span>
                      </td>
                      <td className="py-6 px-8 ">
                        <div className="flex flex-col gap-3">
                          <span className="p-2 bg-beyours-550 w-fit rounded-md text-sm">
                            {attendanceData.created_at}
                          </span>
                          <span className="p-2 bg-beyours-550 w-fit rounded-md text-sm">
                            {attendanceData.updated_at}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-8 ">
                        <span
                          className={
                            "text-white px-3 py-2 rounded-md " +
                            ATTENDANCE_VERIFY_CLASS_MAP[attendanceData.verified]
                          }
                        >
                          {ATTENDANCE_VERIFY_TEXT_MAP[attendanceData.verified]}
                        </span>
                      </td>
                      <td className="py-6 px-8 ">
                        <div className="h-full w-full flex justify-end">
                          <Link
                            className="rounded-full bg-beyours-1100 border-[1px] border-beyours-900 p-[4px] hover:bg-beyours-900 hover:scale-110 transition-all ease-in-out duration-300 "
                            href={route("community.attendance.show", [community.id, attendanceData ])}
                          >
                            <IconDetail className="stroke-white" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                }) : ""}
              </tbody>
            </table>
          </div>
          <div className="w-full flex absolute bottom-0 bg-beyours-650 border-t-beyours-600 border-t-[1px] px-6 py-4 h-20 box-border"></div>
        </div>
      </section>
    </CommunityLayout>
  );
}
