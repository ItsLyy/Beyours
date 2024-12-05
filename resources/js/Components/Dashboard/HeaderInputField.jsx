export default function HeaderInputField({ title, description, className, required = false }) {
  return (
    <div className={"max-w-80 " + className}>
      <h2 className="text-white text-lg">{ title } {required ? <span className="text-red-700">*</span> : ""} </h2>
      <p className="text-sm">{ description }</p>
    </div>
  )
}
