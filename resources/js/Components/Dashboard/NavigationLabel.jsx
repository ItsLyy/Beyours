export default function NavigationLabel({ children, isOpen }) {
  return (
    <span
      className={"hidden text-nowrap md:inline " + (isOpen ? "" : "md:hidden")}
    >
      {children}
    </span>
  );
}
