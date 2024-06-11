import { forwardRef } from "react";
import FolderIcon from "@/assets/images/Common/Folder.svg";

/* eslint-disable  @typescript-eslint/no-explicit-any */
const FileInput = forwardRef(function FileInput(
  {
    label,
    type = "image",
    files,
    handleChange,
  }: {
    label?: string;
    type: "image" | "file";
    files: File[];
    handleChange: (files: File[]) => void;
  },
  ref: any
) {
  return (
    <div
      className="w-full"
      style={{
        display: files.length > 0 ? "block" : "none",
      }}
    >
      {label && (
        <p className="text-sm font-normal text-dark-gray w-full ">{label}</p>
      )}
      {type === "image" ? (
        <>
          <div
            className={`flex gap-2 max-w-full overflow-x-auto overflow-y-hidden`}
          >
            {[...files.map((file) => URL.createObjectURL(file))].map(
              (item, index) => (
                <div key={index} className="size-fit relative">
                  <img
                    src={item}
                    alt="image"
                    className={`h-[156px] w-[117px] rounded-[10px] object-cover cursor-pointer`}
                  />

                  <button
                    className="absolute top-1 right-1 rounded-full bg-white p-1"
                    onClick={() =>
                      handleChange([
                        ...files.slice(0, index),
                        ...files.slice(index + 1),
                      ])
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <div className={`gap-2 flex flex-col`}>
            {[...files.map((file) => file.name)].map((item, index) => (
              <div
                key={index}
                className={` h-8 rounded bg-blue bg-opacity-5 p-[6px] flex flex-row justify-between items-center`}
              >
                <div className={`flex flex-row items-center gap-2`}>
                  <img src={FolderIcon} />
                  <span className={`text-sm font-semibold text-blue`}>
                    {item}
                  </span>
                </div>

                <button
                  onClick={() =>
                    handleChange([
                      ...files.slice(0, index),
                      ...files.slice(index + 1),
                    ])
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <label className="w-full relative" ref={ref}>
        <input
          type="file"
          className="hidden"
          multiple
          onChange={(e) => {
            handleChange([...files, ...Array.from(e.target.files!)]);
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
});

export default FileInput;
