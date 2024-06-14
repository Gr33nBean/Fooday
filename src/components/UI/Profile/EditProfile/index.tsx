import CustomDialog from "@/components/common/Dialog";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Input/Textarea";
import { routes } from "@/constants/tabBarIcon.constant";
import { auth } from "@/libs/firebase/firebase.config";
import { selectSignedUser, setSignedUser } from "@/redux/features/accountSlice";
import { setIsLoading } from "@/redux/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { uploadService } from "@/services/upload.service";
import { userService } from "@/services/user.service";
import { getFileFromId } from "@/utils";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { signOut } from "firebase/auth";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type EditFormType = {
  userName: string;
  birthday: string;
  description: string;
};

const EditProfile = () => {
  const signedUser = useAppSelector(selectSignedUser);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<File | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditFormType>({
    defaultValues: {
      userName: signedUser?.username,
      birthday: new Date(signedUser ? signedUser.birthday * 1000 : 0)
        .toISOString()
        .split("T")[0],
      description: signedUser?.description,
    },
  });

  const onSubmit: SubmitHandler<EditFormType> = async (data) => {
    if (!signedUser) {
      return;
    }
    dispatch(setIsLoading(true));
    setIsOpen(false);

    const payload: {
      uid: string;
      departmentId: string;
      grade: string;
      username: string;
      birthday: number;
      email: string;
      avatar: string;
      description: string;
      permissionIdToCRUD: string[];
      status: string;
    } = {
      uid: signedUser.uid,
      departmentId: signedUser.departmentId,
      grade: signedUser.grade,
      username: data.userName,
      birthday: new Date(data.birthday).getTime() / 1000,
      email: signedUser.email,
      avatar: signedUser.avatar,
      description: data.description,
      permissionIdToCRUD: signedUser.permissionIdToCRUD,
      status: signedUser.status,
    };
    if (avatar) {
      const res = await uploadService.uploadFiles([avatar]);
      payload.avatar = getFileFromId(res, "image")[0].url;
    }
    const res = await userService.updateUser([payload]);
    if (res) {
      toast.success("Cập nhật thành công");
      dispatch(
        setSignedUser({
          ...signedUser,
          username: payload.username,
          birthday: payload.birthday,
          description: payload.description,
          avatar: payload.avatar,
        })
      );
    }

    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        userName: signedUser?.username,
        birthday: new Date(signedUser ? signedUser.birthday * 1000 : 0)
          .toISOString()
          .split("T")[0],
        description: signedUser?.description,
      });
      setAvatar(undefined);
    }
  }, [signedUser, isOpen, reset]);

  return (
    <>
      <PopoverGroup>
        <Popover>
          <PopoverButton className="rounded-full border border-dark-gray bg-opacity-10 text-dark-gray text-center h-fit  leading-4 font-semibold hover:opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </PopoverButton>
          <PopoverPanel
            hidden
            anchor="bottom end"
            className="flex min-w-[160px] bg-white rounded-xl shadow-2xl flex-col border"
          >
            {[
              {
                label: "Chỉnh sửa",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                ),
                onClick: () => setIsOpen(true),
              },
              {
                label: "Đăng xuất",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                ),
                onClick: () => {
                  signOut(auth)
                    .then(() => {
                      toast.success("Đăng xuất thành công");
                      window.location.href = routes.home.href;
                    })
                    .catch(() => {});
                },
              },
            ].map((item, index) => (
              <button
                key={index}
                className="flex items-center p-3 text-xs text-black "
                onClick={item.onClick}
              >
                <div>{item.icon}</div>
                <p className="w-[calc(100%-16px)] pl-2 text-start truncate">
                  {item.label}
                </p>
              </button>
            ))}
          </PopoverPanel>
        </Popover>
      </PopoverGroup>
      <CustomDialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full overflow-y-auto relative max-h-[70svh]">
          <div className="w-full text-center sticky top-0 z-10 bg-white font-bold text-base pb-4">
            Chỉnh sửa
            <button
              className="absolute top-0 right-0"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full flex flex-col items-center gap-2 ">
              <label className="size-[164px] rounded-xl overflow-hidden cursor-pointer relative">
                <img
                  className="size-full object-cover"
                  src={
                    avatar ? URL.createObjectURL(avatar) : signedUser?.avatar
                  }
                  alt=""
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setAvatar(e.target.files?.[0])}
                />
                <div className="absolute inset-0 size-full z-10 opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
              </label>

              <div className="flex flex-col w-full gap-1">
                <Input
                  label="Tên người dùng"
                  {...register("userName", { required: true })}
                  placeholder="Tên người dùng"
                />
                {errors.userName && (
                  <span className="text-pink text-sm">
                    Tên người dùng không được trống
                  </span>
                )}

                <Input
                  label="Ngày sinh"
                  {...register("birthday", {
                    required: true,
                  })}
                  placeholder="Ngày sinh"
                  type="date"
                />
                {errors.birthday && (
                  <span className="text-pink text-sm">
                    Ngày sinh không được trống
                  </span>
                )}

                <Textarea
                  label="Mô tả"
                  rows={4}
                  {...register("description")}
                  placeholder="Mô tả"
                />
              </div>
            </div>

            <div className="sticky bottom-0 z-10 bg-white">
              <button
                type="submit"
                className="w-full mt-4 text-center bg-blue rounded-lg py-2 text-white font-semibold"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </CustomDialog>
    </>
  );
};

export default EditProfile;
