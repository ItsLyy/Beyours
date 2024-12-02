export default function TaskOverview({ titles, datas, className }) {
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
        <tbody className="">
        {
          datas?.map((data, index) => {
            return (
              <tr key={index} className="text-beyours-300 border-b-[.5px] border-b-[#141414]">
                <td className="p-8">{data.task}</td>
                <td className="p-8">{data.status}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}
