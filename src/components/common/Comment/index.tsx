import PostImages from "../Post/PostImages/index";
import PostBase, { PostBaseType } from "../PostBase";
import FolderIcon from "@/assets/images/Common/Folder.svg";
import DownloadFileIcon from "@/assets/images/Common/Download_Package.svg";

export type CommentProps = PostBaseType & {
  content: string;
  imageUrls: string[];
  attachedFiles?: string[];
};

const Comment = ({
  userName,
  createdAt,
  id,
  content,
  imageUrls,
  attachedFiles,
  avatar,
}: CommentProps) => {
  return (
    <PostBase
      userName={userName}
      createdAt={createdAt}
      avatar={avatar}
      id={id}
      type="comment"
    >
      <div className="w-full flex flex-col gap-1">
        <p className="text-base font-normal text-black">{content}</p>
        <PostImages imageUrls={imageUrls} />

        <div className={`gap-2 flex flex-col`}>
          {attachedFiles?.map((item, index) => (
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

              <button>
                <img src={DownloadFileIcon} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </PostBase>
  );
};

export default Comment;
