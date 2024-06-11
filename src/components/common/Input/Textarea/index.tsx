import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(
  {
    startIcon,
    endIcon,
    label,
    ...props
  }: {
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    label?: string;
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref?: React.Ref<HTMLTextAreaElement>
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
        <textarea
          ref={ref}
          {...props}
          className={`outline-none flex-1 z-10  px-4 py-2 text-base bg-transparent font-medium text-black ${props.className}`}
        />
        {endIcon && (
          <div className="flex items-center px-4   border-l border-extra-light-gray">
            {endIcon}
          </div>
        )}
      </label>
    </div>
  );
});

export default Textarea;
