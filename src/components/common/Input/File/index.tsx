import { forwardRef } from "react";
import FolderIcon from "@/assets/images/Common/Folder.svg";

/* eslint-disable  @typescript-eslint/no-explicit-any */
const FileInput = forwardRef(function FileInput(
  {
    label,
    type = "image",
    files,
    handleChange,
    isChat,
  }: {
    label?: string;
    type: "image" | "file";
    files: File[];
    handleChange: (files: File[]) => void;
    isChat?: boolean;
  },
  ref: any
) {
  return (
    <div
      className="w-full relative"
      style={{
        display: files.length > 0 ? "block" : "none",
      }}
    >
      {label && (
        <p className="text-xs font-normal text-dark-gray w-full mb-1">
          {label}
        </p>
      )}
      {type === "image" ? (
        <div className="max-w-full overflow-y-hidden overflow-x-auto">
          <div className={`flex gap-2 `}>
            {[...files.map((file) => URL.createObjectURL(file))].map(
              (item, index) => (
                <div key={index} className="size-fit relative">
                  <img
                    src={item}
                    alt="image"
                    className={`object-cover cursor-pointer`}
                    style={{
                      height: isChat ? "64px" : "156px",
                      width: isChat ? "64px" : "117px",
                      minWidth: isChat ? "64px" : "117px",
                      borderRadius: isChat ? "4px" : "10px",
                      border: "1px solid #E0E0E0",
                    }}
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
        </div>
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
