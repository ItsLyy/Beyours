import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant"

export default function TaskOverview({ titles, tasks, className }) {
  return (
    <div className={"bg-beyours-700 rounded-md h-full overflow-y-scroll " + className}>
      <table className="border-collapse table-fixed w-full">
        <thead className="sticky top-0 left-0">
          <tr className="bg-[#191919] border-b-[.5px] border-b-beyours-600 ">
            {
              titles?.map((title, index) => {
                return(<th key={index} className="text-start py-4 px-8 font-thin">{title}</th>)
              })
            }
          </tr>
        </thead>
        <tbody>
        {
          tasks?.map((task, index) => {
            return (
              <tr key={index} className="text-beyours-300 border-b-[.5px] border-b-[#141414]">
                <td className="p-8">{task.title}</td>
                <td className="p-8 "> <span className={"p-2 text-white rounded-md " + TASK_STATUS_CLASS_MAP[task.task.done]}>{TASK_STATUS_TEXT_MAP[task.task.done]}</span> </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}
