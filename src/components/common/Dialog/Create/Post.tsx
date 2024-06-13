import { TABS } from "@/constants";
import { selectSignedUser } from "@/redux/features/accountSlice";
import {
  selectIsCreatePostInEvent,
  setIsCreatePostInEvent,
  setIsLoading,
} from "@/redux/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { postTypeService } from "@/services/postType.service";
import { PostType, User } from "@/services/type";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Avatar from "../../Avatar";
import Input from "../../Input";
import FileInput from "../../Input/File";
import Mention from "../../Input/Mention";
import Select from "../../Input/Select";
import Textarea from "../../Input/Textarea";
import { uploadService } from "@/services/upload.service";
import { getFileFromId } from "@/utils";
import { postService } from "@/services/post.service";
import toast from "react-hot-toast";
import Button from "@/components/UI/Home/Button";
import { setIsOpenCreateModal } from "@/redux/features/globalModalSlice";

type createPost = {
  title: string;
  postTypeId: string;
  content: string;
};

const Post = ({ handleClose }: { handleClose: () => void }) => {
  const signedUser = useAppSelector(selectSignedUser);
  const isCreatePostInEvent = useAppSelector(selectIsCreatePostInEvent);

  const { data: postTypes } = useQuery<PostType[]>({
    queryKey: ["home_tabs"],
    queryFn: async () => {
      const res = await postTypeService.getAll();
      return res;
    },
  });
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [mentionData, setMentionData] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<createPost>({
    defaultValues: {
      postTypeId: isCreatePostInEvent == -1 ? "" : TABS.EVENT,
    },
  });

  const onSubmit: SubmitHandler<createPost> = async (data) => {
    if (!signedUser?.uid) {
      return;
    }
    dispatch(setIsLoading(true));
    const payload: {
      postTypeId: string;
      creatorUid: string;
      eventId: number | null;
      mentionUid: string[];
      title: string;
      content: string;
      images: string[];
      files: string[];
      status: "create";
    } = {
      postTypeId: isCreatePostInEvent == -1 ? data.postTypeId : TABS.EVENT,
      creatorUid: signedUser.uid,
      eventId: isCreatePostInEvent == -1 ? null : isCreatePostInEvent,
      mentionUid: mentionData.map((item) => item.uid),
      title: data.title,
      content: data.content,
      images: [],
      files: [],
      status: "create",
    };
    if (images && images.length > 0) {
      const res = await uploadService.uploadFiles(images);
      payload.images = getFileFromId(res, "image").map((item) => item.url);
    }

    const res = await postService.createPost([payload]);
    console.log(res);
    if (res) {
      toast.success("Tạo bài thành công.");
    }
    reset();
    setImages([]);
    setFiles([]);
    setMentionData([]);
    dispatch(setIsLoading(false));
    dispatch(setIsCreatePostInEvent(-1));
    dispatch(setIsOpenCreateModal(false));
    handleClose();
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const imageRef = useRef<any>(null);
  const fileRef = useRef<any>(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full">
        {/*  */}
        <div className=" flex items-stretch">
          {/*  */}
          <div className="flex flex-col items-center gap-2">
            <Avatar src={signedUser?.avatar} />
            <div className="bg-extra-light-gray w-[1px] flex-1" />
          </div>
          {/*  */}
          <div className="w-[calc(100%-32px)] pl-2 flex flex-col gap-4">
            <p className={`text-sm font-bold flex-1`}>{signedUser?.username}</p>

            <div>
              <Input
                label="Tiêu đề"
                {...register("title", { required: true, maxLength: 100 })}
              />
              {errors.title && (
                <p className="text-pink text-xs">Tiêu đề không được trống</p>
              )}
            </div>
            <Select
              label="Loại bài đăng"
              {...register("postTypeId", { required: true })}
            >
              {[
                { id: "", name: "" },
                ...(postTypes?.filter((item) => {
                  if (isCreatePostInEvent != -1) {
                    return item.id == TABS.EVENT;
                  }
                  return item.id != TABS.EVENT;
                }) ?? []),
              ].map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <Textarea
              rows={3}
              className="resize-none"
              label="Nội dung"
              {...register("content", { maxLength: 300 })}
            />

            <FileInput
              ref={imageRef}
              label={images.length > 0 ? "Hình ảnh" : ""}
              files={images}
              type="image"
              handleChange={setImages}
            />

            <FileInput
              ref={fileRef}
              label={files.length > 0 ? "Đính kèm" : ""}
              files={files}
              type="file"
              handleChange={setFiles}
            />

            <Mention
              label="Lượt nhắc"
              mentionData={mentionData}
              onChangeMentionData={(value: User) => {
                const exist = mentionData.find(
                  (item) => item.uid === value.uid
                );
                if (exist) {
                  setMentionData(
                    mentionData.filter((item) => item.uid !== value.uid)
                  );
                } else {
                  setMentionData([...mentionData, value]);
                }
              }}
              deleteMentionData={() => {
                setMentionData([]);
              }}
            />
          </div>
        </div>

        {/*  */}
        <div className="flex items-center w-full gap-2 py-2">
          <div className="size-[32px] flex justify-center items-center">
            <Avatar src={signedUser?.avatar} className="!size-[20px]" />
          </div>
          <div className="flex-1 flex items-center gap-3">
            <p className="flex-1 text-xs font-light text-dark-gray">
              Thêm bài đăng
            </p>

            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1da1f2"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                ),
                onclick: () => {
                  if (imageRef.current) {
                    // click
                    imageRef.current.click();
                  }
                },
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1da1f2"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                ),
                onclick: () => {
                  if (fileRef.current) {
                    // click
                    fileRef.current.click();
                  }
                },
              },
            ].map((item, index) => (
              <button key={index} onClick={item.onclick}>
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      {isValid && (
        <div className="w-full bg-white py-3 flex items-center gap-2 border-t border-extra-light-gray">
          <p className="flex-1 text-xs font-light text-dark-gray">
            Tất cả mọi người có thể xem và bình luận
          </p>
          <Button type="submit" text="Đăng bài" className="px-4" />
        </div>
      )}
    </form>
  );
};

export default Post;
