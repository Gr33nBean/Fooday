import { convertDateToTimestamp } from "@/utils/index";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CustomDialog from "../Dialog/index";
import Input from "../Input/index";
import PostImages from "../Post/PostImages/index";
import PostBase from "../PostBase/index";
import { getColorFromType, getVNLabel } from "@/constants/type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSignedUser } from "@/redux/features/accountSlice";
import { setIsLoading } from "@/redux/features/dialogSlice";
import { resourceUsingService } from "@/services/resourceUsing.service";
import Button from "@/components/UI/Home/Button";
import { setIsOpenCreateModal } from "@/redux/features/globalModalSlice";

export type ResourceProps = {
  id: number;
  createAt: string;
  name: string;
  description: string;
  images: string[];
  type: string;
  isFree: boolean;
};

type createResourceUsing = {
  startAt: string;
  endAt: string;
};

const ResourcePost = ({
  id,
  createAt,
  name,
  description,
  images,
  type,
  isFree,
  handleClose,
}: ResourceProps & {
  handleClose: () => void;
}) => {
  const color = getColorFromType("resource");
  const signedUser = useAppSelector(selectSignedUser);
  const dispatch = useAppDispatch();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createResourceUsing>({
    defaultValues: {
      startAt: new Date().toISOString().split("T")[0] + "T00:00:00",
      endAt:
        new Date(new Date().setDate(new Date().getDate() + 1))
          .toISOString()
          .split("T")[0] + "T00:00:00",
    },
  });

  const onSubmit: SubmitHandler<createResourceUsing> = async (data) => {
    if (!signedUser?.uid) {
      return;
    }
    setIsOpenDialog(false);
    dispatch(setIsLoading(true));
    const payLoad: {
      resourceId: number;
      reporterUid: string;
      borrowerUid: string;
      startAt: number;
      endAt: number;
      status: "create";
    } = {
      resourceId: id,
      reporterUid: "AMaTtLLZ3ge3eyJyUjkzgawblfe2",
      borrowerUid: signedUser?.uid,
      startAt: convertDateToTimestamp(new Date(data.startAt)),
      endAt: convertDateToTimestamp(new Date(data.endAt)),
      status: "create",
    };

    console.log(payLoad);

    const res = await resourceUsingService.createResourceUsing([payLoad]);
    if (res) {
      toast.success("Mượn tài nguyên thành công");
    }
    dispatch(setIsLoading(false));
    reset();
    dispatch(setIsOpenCreateModal(false));
    handleClose();
  };

  return (
    <PostBase
      id={id}
      type="resourcePost"
      typeTag="resource"
      tag={type}
      userName={name}
      avatar={images.length > 0 ? images[0] : undefined}
      createdAt={createAt}
      isResource={true}
    >
      <div className={`flex-1 flex flex-col gap-1`}>
        {/* Content */}
        <div className="w-full flex flex-col gap-1 text-base font-normal text-black">
          <p>Mô tả: {description}</p>
          <p>Trạng thái: {isFree ? "Có sẵn" : "Không có sẵn"}</p>
        </div>

        <PostImages imageUrls={images} />

        <div
          className="w-full flex flex-col text-sm font-semibold "
          style={{
            display: !isFree ? "none" : "block",
          }}
        >
          <button
            className="w-full rounded-md border text-center py-1 hover:opacity-70"
            style={{
              color: color,
              borderColor: color,
              backgroundColor: color + "20",
            }}
            onClick={() => setIsOpenDialog(true)}
          >
            Mượn {getVNLabel("resource", type)?.toLowerCase()}
          </button>

          <CustomDialog
            open={isOpenDialog}
            onClose={() => setIsOpenDialog(false)}
            className=""
          >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className=" w-full flex flex-col gap-4 items-center justify-center">
                <p className="text-center w-full font-bold">Mượn tài nguyên</p>

                <Input
                  type="datetime-local"
                  label="Bắt đầu"
                  {...register("startAt", { required: true })}
                />
                <div className="w-full">
                  <Input
                    type="datetime-local"
                    label="Kết thúc"
                    {...register("endAt", {
                      required: true,
                      validate: (value, formValue) => {
                        const compare =
                          new Date(value).getTime() >
                          new Date(formValue.startAt).getTime();
                        return compare;
                      },
                    })}
                  />
                  {errors.endAt && (
                    <p className="text-pink text-xs">
                      Kết thúc phải sau bắt đầu
                    </p>
                  )}
                </div>

                <Button type="submit" text="Tạo" className="px-4" />
              </div>
            </form>
          </CustomDialog>
        </div>
      </div>
    </PostBase>
  );
};

export default ResourcePost;
