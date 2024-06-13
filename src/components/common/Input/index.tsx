import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    startIcon,
    endIcon,
    label,
    ...props
  }: {
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    label?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <div className="w-full text-sm">
      {label && (
        <p className="text-xs font-normal text-dark-gray w-full mb-1">
          {label}
        </p>
      )}
      <label
        className="flex items-stretch w-full relative overflow-hidden rounded-lg  border border-light-gray"
        style={{
          backgroundColor: startIcon ? "#1da1f210" : "white",
        }}
      >
        {startIcon && (
          <div className="flex items-center px-3 bg-white shadow-lg  border-r border-extra-light-gray">
            {startIcon}
          </div>
        )}
        <input
          type="text"
          ref={ref}
          className="outline-none flex-1 w-1 z-10  p-2 bg-transparent font-medium text-black "
          {...props}
        />
        {endIcon && (
          <div className="flex items-center px-3  border-l border-extra-light-gray">
            {endIcon}
          </div>
        )}
      </label>
    </div>
  );
});

export default Input;
