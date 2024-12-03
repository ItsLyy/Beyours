export default function DashboardTask({ tasks }) {
  return (
    <table>
      <tbody>
        { tasks?.map(task => {
          return (
            <tr>
              <td>{task.title}</td>
            </tr>
          )
        }) }
      </tbody>
    </table>
  )
}
