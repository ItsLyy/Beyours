import { useState } from "react";

export default function SearchBar({ type = "text", className = "", Icon, name, eventHandler, ...props }) {
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  return (
    <div className={"relative flex items-center " + className}>
      {Icon ? (
        <div className={"absolute left-0 mx-4 z-10"}>
          {
            <label htmlFor={name}>
              <Icon
                className={
                  isFocus || inputValue.length > 0 ? "stroke-beyours-100" : "stroke-beyours-600"
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
          "text-sm rounded-md bg-beyours-700 text-[#ffffff] py-4 border-0 shadow-sm transition-all ease-in-out duration-300 placeholder:text-beyours-450 placeholder:font-geist focus:border-beyours-600 focus:ring-beyours-600 w-full"
        }
        value={inputValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e) => {
          setInputValue(e.target.value);
          eventHandler ? eventHandler(e) : '';
        }}
      />
    </div>
  )
}
