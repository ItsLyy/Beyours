import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export default forwardRef(function TextInput(
  { type = "text", className = "", isFocused = false, Icon, name, ...props },
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
      {Icon ? (
        <div className={"absolute left-0 m-[16.5px] w-4 h-4 z-10"}>
          {
            <label htmlFor={name}>
              <Icon
                className={
                  isFocus || localRef.current?.value.length > 0 ? "stroke-beyours-100" : "stroke-beyours-500"
                }
              />
            </label>
          }
        </div>
      ) : (
        ""
      )}
      <input
        {...props}
        type={type}
        className={
          (Icon ? "pl-14 " : "") +
          "text-sm rounded-sm bg-beyours-600 text-[#ffffff] py-4 border-0 shadow-sm transition-all ease-in-out duration-300 placeholder:text-beyours-450 placeholder:font-geist focus:border-beyours-500 focus:ring-beyours-500 " +
          className
        }
        ref={localRef}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
});
