import FolderIcon from "@/assets/images/Common/Folder.svg";
import DownloadFileIcon from "@/assets/images/Common/Download_Package.svg";

const PostFiles = ({ attachedFiles }: { attachedFiles: string[] }) => {
  return (
    <>
      {attachedFiles.map((item, index) => (
        <div
          key={index}
          className={` h-8 rounded bg-blue bg-opacity-5 p-[6px] flex flex-row justify-between items-center`}
        >
          <div className={`flex flex-row items-center gap-2`}>
            <img src={FolderIcon} />
            <span className={`text-sm font-semibold text-blue`}>{item}</span>
          </div>

          <button>
            <img src={DownloadFileIcon} />
          </button>
        </div>
      ))}
    </>
  );
};

export default PostFiles;
