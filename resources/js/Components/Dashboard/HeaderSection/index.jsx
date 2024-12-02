export default function HeaderSection({ title, subTitle, className }) {
  return (
    <div className={"text-white " + className}>
      <h2 className="text-2xl">{title}</h2>
      { subTitle ? <p className="text-beyours-450">{subTitle}</p> : "" }
    </div>
  )
}
