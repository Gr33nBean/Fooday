import { forwardRef } from "react";

const Select = forwardRef(function Select(
  {
    startIcon,
    endIcon,
    label,
    ...props
  }: {
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    label?: string;
  } & React.SelectHTMLAttributes<HTMLSelectElement>,
  ref?: React.Ref<HTMLSelectElement>
) {
  return (
    <div className="w-full">
      {label && (
        <p className="text-sm font-normal text-dark-gray w-full ">{label}</p>
      )}
      <label
        className="flex items-stretch w-full relative overflow-hidden rounded-lg  border border-light-gray"
        style={{
          backgroundColor: startIcon ? "#1da1f210" : "white",
        }}
      >
        {startIcon && (
          <div className="flex items-center px-4 bg-white shadow-lg  border-r border-extra-light-gray">
            {startIcon}
          </div>
        )}
        <select
          ref={ref}
          className="outline-none flex-1 z-10  px-4 py-2 text-base bg-transparent font-medium text-black "
          {...props}
        >
          {props.children}
        </select>
        {endIcon ? (
          <div className="flex items-center px-4   border-l border-extra-light-gray">
            {endIcon}
          </div>
        ) : (
          <div
            className="pointer-events-none absolute top-0 right-0 h-full px-2 z-10 flex items-center bg-white"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        )}
      </label>
    </div>
  );
});

export default Select;
