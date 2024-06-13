import CustomDialog from "..";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectIsOpenCreateComment,
  setIsLoading,
  setIsOpenCreateComment,
} from "@/redux/features/dialogSlice";
import { useRef, useState } from "react";
import FileInput from "../../Input/File";
import Textarea from "../../Input/Textarea";
import { selectSignedUser } from "@/redux/features/accountSlice";
import Avatar from "../../Avatar";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadService } from "@/services/upload.service";
import { getFileFromId } from "@/utils";
import { commentService } from "@/services/comment.service";
import Button from "@/components/UI/Home/Button";

const Comment = () => {
  const signedUser = useAppSelector(selectSignedUser);

  const postId = useAppSelector(selectIsOpenCreateComment);
  const dispatch = useAppDispatch();

  console.log(postId);
  const [images, setImages] = useState<File[]>([]);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const imageRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<{ content: string }>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<{ content: string }> = async (data) => {
    dispatch(setIsOpenCreateComment(-1));
    dispatch(setIsLoading(true));
    if (!signedUser?.uid) {
      return;
    }
    const payload: {
      userId: string;
      postId: number;
      content: string;
      images: string[];
      file: string[];
      status: "create";
    } = {
      userId: signedUser.uid,
      postId: postId,
      content: data.content,
      images: [],
      file: [],
      status: "create",
    };
    if (images && images.length > 0) {
      const res = await uploadService.uploadFiles(images);
      payload.images = getFileFromId(res, "image").map((item) => item.url);
    }

    const res = await commentService.createComment([payload]);
    console.log(res);
    if (res) {
      toast.success("Đăng bình luận thành công.");
    }
    reset();
    setImages([]);
    dispatch(setIsLoading(false));
  };

  return (
    <CustomDialog
      open={postId != -1}
      onClose={() => dispatch(setIsOpenCreateComment(-1))}
      className="px-0 py-0 relative overflow-y-auto  h-fit w-full "
    >
      <div className="w-full min-h-full h-fit">
        {/* Header */}
        <div className="w-full sticky top-0 z-20 bg-white shadow-sm">
          <p className="w-full  text-center font-bold text-sm text-black py-3 px-5 border-b border-extra-light-gray">
            Bình luận
          </p>
        </div>

        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="ion-padding w-full ">
              {/*  */}
              <div className="flex w-full items-stretch ">
                {/*  */}
                <div className="flex flex-col items-center gap-2">
                  <Avatar src={signedUser?.avatar} />
                  <div className="bg-extra-light-gray w-[1px] flex-1" />
                </div>
                {/*  */}
                <div className="w-[calc(100%-32px)] pl-2 flex flex-col gap-4 text-sm">
                  <p className={`font-bold flex-1`}>{signedUser?.username}</p>
                  <div>
                    <Textarea
                      rows={3}
                      className="resize-none text-xs"
                      label="Nội dung"
                      {...register("content", {
                        maxLength: 300,
                        required: true,
                      })}
                    />
                    {errors.content && (
                      <p className="text-pink text-xs">
                        Nội dung không được trống
                      </p>
                    )}
                  </div>

                  <FileInput
                    ref={imageRef}
                    label={images.length > 0 ? "Hình ảnh" : ""}
                    files={images}
                    type="image"
                    handleChange={setImages}
                  />
                </div>
              </div>

              {/*  */}
              <div className="flex items-center w-full gap-2">
                <div className="size-[32px] flex justify-center items-center">
                  <Avatar src={signedUser?.avatar} className="!size-[20px]" />
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <p className="flex-1 text-xs font-light text-dark-gray">
                    Thêm bình luận
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
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                            ry="2"
                          />
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
                  ].map((item, index) => (
                    <button key={index} onClick={item.onclick}>
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isValid && (
              <div className="w-full  bg-white py-3 px-5 flex items-center gap-2 border-t border-extra-light-gray">
                <p className="flex-1 text-xs font-light text-dark-gray">
                  Tất cả mọi người có thể xem
                </p>
                <Button
                  type="submit"
                  text="Bình luận"
                  className="px-4 text-xs"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </CustomDialog>
  );
};

export default Comment;
