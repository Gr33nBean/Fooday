import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(
  {
    startIcon,
    endIcon,
    label,
    labelClassName,
    ...props
  }: {
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    label?: string;
    labelClassName?: string;
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref?: React.Ref<HTMLTextAreaElement>
) {
  return (
    <div className="w-full">
      {label && (
        <p className="text-xs mb-1 font-normal text-dark-gray w-full ">
          {label}
        </p>
      )}
      <label
        className={`flex items-stretch w-full relative overflow-hidden rounded-lg border border-light-gray ${labelClassName}`}
        style={{
          backgroundColor: startIcon ? "#1da1f210" : "white",
        }}
      >
        {startIcon && (
          <div className="flex items-center px-4 bg-white shadow-lg  border-r border-extra-light-gray">
            {startIcon}
          </div>
        )}
        <textarea
          ref={ref}
          {...props}
          className={`outline-none flex-1 z-10  p-2 text-sm bg-transparent font-medium text-black ${props.className}`}
        />
        {endIcon && (
          <div className="flex items-center px-3 border-l border-extra-light-gray">
            {endIcon}
          </div>
        )}
      </label>
    </div>
  );
});

export default Textarea;
