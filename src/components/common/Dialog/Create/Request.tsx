import { selectSignedUser } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { requestTypeService } from "@/services/requestType.service";
import { RequestType } from "@/services/type";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import Avatar from "../../Avatar";
import Input from "../../Input";
import Select from "../../Input/Select";
import Textarea from "../../Input/Textarea";
import { useDispatch } from "react-redux";
import { setIsLoading, setIsOpenCreate } from "@/redux/features/dialogSlice";
import { convertDateToTimestamp } from "@/utils";
import { requestService } from "@/services/request.service";
import toast from "react-hot-toast";
import Button from "@/components/UI/Home/Button";
import { setIsOpenCreateModal } from "@/redux/features/globalModalSlice";
type createRequest = {
  requesterUid: string;
  requestTypeId: string;
  reporterUid: string;
  name: string;
  description: string;
  startAt: string;
  endAt: string;
  status: string;
};
const Request = ({ handleClose }: { handleClose: () => void }) => {
  const signedUser = useAppSelector(selectSignedUser);
  console.log(signedUser);

  const dispatch = useDispatch();
  const { data: requestTypes } = useQuery<RequestType[]>({
    queryKey: ["request_type"],
    queryFn: async () => {
      const res = await requestTypeService.getAll();
      return res;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createRequest>({
    defaultValues: {
      requesterUid: signedUser?.uid,
      status: "create",
      startAt: new Date().toISOString().split("T")[0] + "T00:00:00",
      endAt:
        new Date(new Date().setDate(new Date().getDate() + 1))
          .toISOString()
          .split("T")[0] + "T00:00:00",
    },
  });

  const onSubmit: SubmitHandler<createRequest> = async (data) => {
    console.log(data);
    if (!signedUser?.uid) {
      return;
    }
    dispatch(setIsLoading(true));
    const payload: {
      requesterUid: string;
      requestTypeId: string;
      name: string;
      description: string;
      startAt: number;
      endAt: number;
      approvalStatus: "pending";
      status: "create";
      reporterUid: string;
    } = {
      requesterUid: data.requesterUid,
      reporterUid:
        requestTypes?.find((item) => item.id === data.requestTypeId)?.department
          ?.directorUid ?? signedUser?.uid,
      requestTypeId: data.requestTypeId,
      name: data.name,
      description: data.description,
      startAt: convertDateToTimestamp(new Date(data.startAt)),
      endAt: convertDateToTimestamp(new Date(data.endAt)),
      approvalStatus: "pending",
      status: "create",
    };

    const res = await requestService.createRequest([payload]);
    if (res) {
      toast.success("Tạo yêu cầu thành công");
    }
    dispatch(setIsLoading(false));
    dispatch(setIsOpenCreate(false));
    reset();
    dispatch(setIsOpenCreateModal(false));

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full">
        {/*  */}
        <div className=" flex items-stretch ">
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
                {...register("name", { required: true, maxLength: 100 })}
              />
              {errors.name && (
                <p className="text-pink text-xs">Tiêu đề không được trống</p>
              )}
            </div>
            <Select
              label="Loại yêu cầu"
              {...register("requestTypeId", { required: true })}
            >
              {[{ id: "", name: "" }, ...(requestTypes ?? [])].map(
                (item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                )
              )}
            </Select>
            <Textarea
              rows={3}
              className="resize-none"
              label="Mô tả"
              {...register("description", { maxLength: 300 })}
            />

            <div>
              <Input
                type="datetime-local"
                label="Bắt đầu"
                min={new Date().toISOString()}
                {...register("startAt", {
                  required: true,
                  validate: (value) =>
                    new Date(value).getTime() > new Date().getTime(),
                })}
              />
              {errors.startAt && (
                <p className="text-pink text-xs">
                  Ngày bắt đầu không trước hiện tại
                </p>
              )}
            </div>

            {/* keep endat is always after startat */}
            <div>
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
                <p className="text-pink text-xs">Kết thúc phải sau bắt đầu</p>
              )}
            </div>
          </div>
        </div>

        {/*  */}
        <div className="flex items-center w-full gap-2">
          <div className="size-[32px] flex justify-center items-center">
            <Avatar src={signedUser?.avatar} className="!size-[20px]" />
          </div>
          <div className="flex-1 flex items-center gap-3">
            <p className="flex-1 text-xs font-light text-dark-gray">
              Thêm yêu cầu
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="w-full  bg-white py-3 flex items-center gap-2 border-t border-extra-light-gray">
        <p className="flex-1 text-xs font-light text-dark-gray"></p>
        <Button type="submit" text="Tạo yêu cầu" className="px-4" />
      </div>
    </form>
  );
};

export default Request;
