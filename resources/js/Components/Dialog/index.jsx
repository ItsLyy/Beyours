import DialogBody from "./DialogBody";
import DialogFooter from "./DialogFooter";
import DialogHeader from "./DialogHeader";

export default function Dialog({ title, useFooter, children, footerContent }) {
  return (
    <div className="w-full rounded-sm overflow-hidden bg-beyours-700 shadow-md sm:max-w-md sm:rounded-md">
      <DialogHeader title={title}/>
      <DialogBody>
        { children }
      </DialogBody>
      {
        useFooter ?
          <DialogFooter footerContent={footerContent} /> :
          ""
      }
    </div>
  )
}
