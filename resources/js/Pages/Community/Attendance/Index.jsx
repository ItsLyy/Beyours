import HeaderSection from "@/Components/Dashboard/HeaderSection";
import PhotoProfile from "@/Components/Dashboard/PhotoProfile";
import IconAdd from "@/Components/Icons/IconAdd";
import IconDetail from "@/Components/Icons/IconDetail";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryNavigationButton from "@/Components/PrimaryNavigationButton";
import TextInput from "@/Components/TextInput";
import {
  ATTENDANCE_STATUS_CLASS_MAP,
  ATTENDANCE_STATUS_TEXT_MAP,
  ATTENDANCE_VERIFY_CLASS_MAP,
  ATTENDANCE_VERIFY_TEXT_MAP,
} from "@/constant";
import CommunityLayout from "@/Layouts/CommunityLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DatePicker from "react-datepicker";
import { createPortal } from "react-dom";
import "react-datepicker/dist/react-datepicker.css";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({
  community,
  character,
  attendances,
  queryParams = null,
}) {
  const [swalShown, setSwalShown] = useState(false);
  const [reportDate, setReportDate] = useState(new Date());
  console.log(reportDate);

  const queryHandler = (name, value) => {
    const updatedParams = { ...queryParams };
    if (value) {
      updatedParams[name] = value;
    } else {
      delete updatedParams[name];
    }

    queryParams = updatedParams;
    router.get(
      route("community.attendance.index", [community.id, updatedParams])
    );
  };

  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;

    return <span title={tooltipText}>{shortMonth}</span>;
  };

  const exportDataHandler = () => {
    withReactContent(Swal).fire({
      icon: "question",
      title: `Are you want to get report?`,
      html: `If you get report on month's selected it will automatically go to pdf stream and you can export it to pdf. Are you sure? <br/>`,
      didOpen: () => setSwalShown(true),
      didClose: () => setSwalShown(false),
      showConfirmButton: false,
    });
  };

  return (
    <CommunityLayout community={community} character={character.data}>
      <Head title="Attendance" />

      {swalShown &&
        createPortal(
          <div className="flex flex-col justify-center items-center gap-5">
            <DatePicker
              selected={reportDate}
              onChange={(date) => setReportDate(date)}
              renderMonthContent={renderMonthContent}
              calendarClassName="!bg-beyours-600 !font-geist !text-beyours-100"
              popperClassName="!bg-beyours-600"
              className="my-4 bg-beyours-600 border-beyours-550"
              popperPlacement="top"
              showMonthYearPicker
              dateFormat="MM/yyyy"
            />
            <PrimaryButton
              className="!w-fit h-10"
              onClick={() => {
                window.open(
                  route("community.attendance.report", {
                    community: community.id,
                    date: reportDate,
                  }),
                  "_blank"
                );
              }}
            >
              YES
            </PrimaryButton>
          </div>,
          Swal.getHtmlContainer()
        )}

      <section className="w-full h-screen box-border text-white flex justify-center items-center flex-col p-8 py-24 md:py-8">
        <div className="flex justify-between items-center p-2 border-b-beyours-600 border-b-[1px] w-full mb-4 text-sm md:text-base">
          <HeaderSection
            title="Attendance List"
            subTitle="Take any attendance every morning and afternoon"
          />
          <div className="flex gap-2">
            {character.data.role === "owner" ? (
              <>
                <TextInput
                  type="date"
                  id="filter-date"
                  name="filter-date"
                  className="cursor-pointer"
                  value={queryParams ? queryParams["date"] : ""}
                  onChange={(e) => queryHandler("date", e.target.value)}
                />
                <PrimaryButton
                  onClick={exportDataHandler}
                  className="text-nowrap"
                >
                  Export
                </PrimaryButton>
              </>
            ) : (
              ""
            )}

            {!attendances.data.some(
              (attendance) =>
                attendance.id === character.data.id && attendance.attendances
            ) && character.data.role !== "owner" ? (
              <PrimaryNavigationButton
                href={route("community.attendance.create", community.id)}
                className="!w-fit !h-fit !p-[.5rem]"
              >
                <IconAdd className="size-5" />
              </PrimaryNavigationButton>
            ) : null}
          </div>
        </div>
        <div className="w-full h-4/5 box-border bg-beyours-700 rounded-md relative">
          <div className="w-full max-h-full overflow-y-auto block pb-20">
            <table className="w-full h-full table-fixed border-collapse ">
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
                {attendances
                  ? attendances.data.map((attendance) => {
                      return (
                        <tr
                          className={
                            "border-b-[1px] border-b-beyours-600 " +
                            (attendance.attendances ? "" : "opacity-40")
                          }
                          key={attendance.id}
                        >
                          <td className="py-6 px-8 ">
                            <div className="flex items-center gap-4 text-white">
                              <div>
                                <PhotoProfile
                                  className="size-14"
                                  imageData={attendance.photo_profile || ""}
                                />
                              </div>
                              {attendance.fullname || ""}
                            </div>
                            <dl className="xl:hidden flex flex-col gap-3">
                              <dt className="sr-only">Status</dt>
                              <dd className="mt-8 ">
                                <span
                                  className={
                                    "p-2 text-white rounded-md " +
                                    ATTENDANCE_STATUS_CLASS_MAP[
                                      attendance.attendances
                                        ? attendance.attendances.pivot.status
                                        : "none"
                                    ]
                                  }
                                >
                                  {
                                    ATTENDANCE_STATUS_TEXT_MAP[
                                      attendance.attendances
                                        ? attendance.attendances.pivot.status
                                        : "none"
                                    ]
                                  }
                                </span>
                              </dd>
                              <dt className="sr-only">Time</dt>
                              <dd className="mt-4 ">
                                <div className="flex flex-col gap-3">
                                  <span className="p-2 bg-beyours-550 w-fit text-nowrap rounded-md text-sm">
                                    {attendance.attendances
                                      ? attendance.attendances.pivot.created_at
                                      : "0000-00-00 00:00:00"}
                                  </span>
                                  <span className="p-2 bg-beyours-550 w-fit text-nowrap rounded-md text-sm">
                                    {attendance.attendances
                                      ? attendance.attendances.pivot.updated_at
                                      : "0000-00-00 00:00:00"}
                                  </span>
                                </div>
                              </dd>
                              <dt className="sr-only">Verify</dt>
                              <dd className="mt-4 ">
                                <span
                                  className={
                                    "text-white px-3 py-2 rounded-md text-nowrap " +
                                    ATTENDANCE_VERIFY_CLASS_MAP[
                                      attendance.attendances
                                        ? attendance.attendances.pivot.verified
                                        : 0
                                    ]
                                  }
                                >
                                  {
                                    ATTENDANCE_VERIFY_TEXT_MAP[
                                      attendance.attendances
                                        ? attendance.attendances.pivot.verified
                                        : 0
                                    ]
                                  }
                                </span>
                              </dd>
                            </dl>
                          </td>
                          <td className="py-6 px-8 hidden xl:table-cell ">
                            <span
                              className={
                                "text-white px-3 py-2 rounded-md text-nowrap " +
                                ATTENDANCE_STATUS_CLASS_MAP[
                                  attendance.attendances
                                    ? attendance.attendances.pivot.status
                                    : "none"
                                ]
                              }
                            >
                              {
                                ATTENDANCE_STATUS_TEXT_MAP[
                                  attendance.attendances
                                    ? attendance.attendances.pivot.status
                                    : "none"
                                ]
                              }
                            </span>
                          </td>
                          <td className="py-6 px-8 hidden xl:table-cell ">
                            <div className="flex flex-col gap-3">
                              <span className="p-2 bg-beyours-550 w-fit text-nowrap rounded-md text-sm">
                                {attendance.attendances
                                  ? attendance.attendances.pivot.created_at
                                  : "0000-00-00 00:00:00"}
                              </span>
                              <span className="p-2 bg-beyours-550 w-fit text-nowrap rounded-md text-sm">
                                {attendance.attendances
                                  ? attendance.attendances.pivot.updated_at
                                  : "0000-00-00 00:00:00"}
                              </span>
                            </div>
                          </td>
                          <td className="py-6 px-8 hidden xl:table-cell ">
                            <span
                              className={
                                "text-white px-3 py-2 rounded-md text-nowrap " +
                                ATTENDANCE_VERIFY_CLASS_MAP[
                                  attendance.attendances
                                    ? attendance.attendances.pivot.verified
                                    : 0
                                ]
                              }
                            >
                              {
                                ATTENDANCE_VERIFY_TEXT_MAP[
                                  attendance.attendances
                                    ? attendance.attendances.pivot.verified
                                    : 0
                                ]
                              }
                            </span>
                          </td>
                          <td className="py-6 px-8 ">
                            <div className="h-full w-full flex justify-end">
                              {attendance.attendances ? (
                                <Link
                                  className="rounded-full bg-beyours-1100 border-[1px] border-beyours-900 p-[4px] hover:bg-beyours-900 hover:scale-110 transition-all ease-in-out duration-300 "
                                  href={route("community.attendance.show", {
                                    community: community.id,
                                    attendance: attendance.attendances.id,
                                    c: attendance.id,
                                  })}
                                >
                                  <IconDetail className="stroke-white" />
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
          <div className="w-full flex absolute bottom-0 bg-beyours-650 border-t-beyours-600 border-t-[1px] px-6 py-4 h-20 box-border"></div>
        </div>
      </section>
    </CommunityLayout>
  );
}
