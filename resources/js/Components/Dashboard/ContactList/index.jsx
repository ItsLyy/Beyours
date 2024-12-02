import ContactItem from "./ContactItem";

export default function ContactList({className}) {
  return(
    <ul className={"bg-beyours-700 overflow-y-auto "+className}>
      <li className=""><ContactItem/></li>
      <li><ContactItem/></li>
    </ul>
  )
}
