import { selectSignedUser } from "@/redux/features/accountSlice";
import { setIsLoading, setIsOpenCreate } from "@/redux/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { departmentService } from "@/services/department.service";
import { Department } from "@/services/type";
import { userService } from "@/services/user.service";
import { convertDateToTimestamp } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Avatar from "../../Avatar";
import Input from "../../Input";
import Select from "../../Input/Select";
import Textarea from "../../Input/Textarea";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Password from "../../Input/Password";
import { auth } from "@/libs/firebase/firebase.config";
import Button from "@/components/UI/Home/Button";
type createUser = {
  uid: string;
  departmentId: string;
  grade: "employee";
  username: string;
  birthday: string;
  email: string;
  avatar: string;
  description: string;
};
const User = () => {
  const signedUser = useAppSelector(selectSignedUser);
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>("");

  const { data } = useQuery<Department[]>({
    queryKey: ["departments_tabs"],
    queryFn: async () => {
      const res = await departmentService.getAll();
      return res;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<createUser>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<createUser> = async (data) => {
    if (!signedUser?.uid) {
      return;
    }
    dispatch(setIsLoading(true));
    const payload: {
      uid: string;
      departmentId: string;
      grade: "employee";
      username: string;
      birthday: number;
      email: string;
      avatar: string;
      description: string;
      permissionIdToCRUD: ["admin", "admin", "admin", "admin"];
      status: "create";
    } = {
      uid: "",
      departmentId: data.departmentId,
      grade: "employee",
      username: data.username,
      birthday: convertDateToTimestamp(new Date(data.birthday)),
      email: data.email,
      avatar: "",
      description: data.description,
      permissionIdToCRUD: ["admin", "admin", "admin", "admin"],
      status: "create",
    };

    await createUserWithEmailAndPassword(auth, data.email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        payload.uid = user.uid;
        const res = await userService.create([payload]);
        console.log(payload);
        if (res) {
          toast.success("Tạo người dùng thành công.");
        }
        reset();
        dispatch(setIsLoading(false));
        dispatch(setIsOpenCreate(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="p-5 flex flex-col">
        {/*  */}
        <div className=" flex items-stretch gap-2">
          {/*  */}
          <div className="flex flex-col items-center gap-2">
            <Avatar src={signedUser?.avatar} />
            <div className="bg-extra-light-gray w-[1px] flex-1" />
          </div>
          {/*  */}
          <div className="flex-1 flex flex-col gap-4">
            <p className={`text-lg font-bold flex-1`}>{signedUser?.username}</p>

            <div>
              <Input
                label="Tên người dùng"
                {...register("username", { required: true, maxLength: 100 })}
              />
              {errors.username && (
                <p className="text-pink text-xs">Tên không được trống</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                label="Email"
                {...register("email", { required: true, maxLength: 100 })}
              />
              {errors.email && (
                <p className="text-pink text-xs">Email không được trống</p>
              )}
            </div>

            <Password
              value={password}
              hideIcon={true}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              type="date"
              label="Ngày sinh"
              {...register("birthday", { required: true })}
            />

            <Select
              label="Phòng ban"
              {...register("departmentId", { required: true })}
            >
              {[{ id: "", name: "" }, ...(data ?? [])].map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <Textarea
              rows={3}
              className="resize-none"
              label="Mô tả"
              {...register("description", { maxLength: 300 })}
            />
          </div>
        </div>

        {/*  */}
        <div className="flex items-center w-full gap-2">
          <div className="size-[48px] flex justify-center items-center">
            <Avatar src={signedUser?.avatar} className="!size-[26px]" />
          </div>
          <div className="flex-1 flex items-center gap-3">
            <p className="flex-1 text- font-light text-dark-gray">
              Thêm người dùng
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      {isValid && password !== "" && (
        <div className="w-full  bg-white py-3 px-5 flex items-center gap-2 border-t border-extra-light-gray">
          <p className="flex-1 text-sm font-light text-dark-gray">
            Tất cả mọi người có thể xem
          </p>
          <Button type="submit" text="Tạo người dùng" className="px-4" />
        </div>
      )}
    </form>
  );
};

export default User;
