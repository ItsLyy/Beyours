import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export default forwardRef(function TextInput(
  { type = "text", className = "", isFocused = false, children, Icon, name, ...props },
  ref
) {
  const localRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <div className="relative flex items-center">
      <select
        {...props}
        name={name}
        id={name}
        className={"text-sm rounded-sm bg-beyours-600 text-[#ffffff] py-4 border-0 shadow-sm transition-all ease-in-out duration-300 placeholder-beyours-450 placeholder:font-geist focus:border-beyours-500 focus:ring-beyours-500 file:absolute file:top-0 file:right-0 file:h-full file:font-geist file:bg-beyours-550 hover:file:bg-beyours-500 file:transition-all file:ease-in-out file:duration-300 file:text-white file:border-0 file:rounded-s-md file:px-4 file:mr-0 " + className}
        ref={localRef}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      >
        { children }
      </select>
    </div>
  );
});

