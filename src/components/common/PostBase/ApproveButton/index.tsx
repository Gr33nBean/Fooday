import { selectSignedUser } from "@/redux/features/accountSlice";
import { setIsLoading } from "@/redux/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { requestService } from "@/services/request.service";
import { resourceUsingService } from "@/services/resourceUsing.service";
import { useCallback } from "react";
import toast from "react-hot-toast";

const ApproveButton = ({
  type,
  id,
  color,
}: {
  type: string;
  id: number;
  color: string;
}) => {
  const signedUser = useAppSelector(selectSignedUser);
  const dispatch = useAppDispatch();

  const handleApprove = useCallback(async () => {
    if (!signedUser?.uid) {
      return;
    }
    dispatch(setIsLoading(true));

    if (type === "request") {
      const payload: {
        id: number;
        // requesterUid: string;
        // requestTypeId: string;
        reporterUid: string;
        // name: string;
        // description: string;
        // startAt: number;
        // endAt: number;
        approvalStatus: string;
        decidedAt: number;
        decisionDetail: string;
        status: "create";
      } = {
        id,
        reporterUid: signedUser?.uid,
        approvalStatus: "approved",
        decidedAt: Math.floor(new Date().getTime() / 1000),
        decisionDetail: "",
        status: "create",
      };
      await requestService.updateRequest([payload]);
    }
    if (type === "resourceUsing") {
      const payload: {
        id: number;
        // "resourceId": number,
        reporterUid: string;
        // "borrowerUid": string,
        // "startAt": number,
        // "endAt": number,
        status: "create";
      } = {
        id,
        reporterUid: signedUser?.uid,
        status: "create",
      };
      await resourceUsingService.updateResourceUsing([payload]);
    }
    toast.success("Thao tác thành công.");
    dispatch(setIsLoading(false));
  }, [type, id, signedUser, dispatch]);

  return (
    <div className="w-full flex flex-col text-sm font-semibold gap-1 ">
      <button
        className="w-full rounded-md border text-center py-1 hover:opacity-70 "
        style={{
          color: color,
          borderColor: color,
          backgroundColor: color + "20",
        }}
        onClick={handleApprove}
      >
        Phê duyệt
      </button>
      <button className="w-full rounded-md border border-dark-gray text-dark-gray text-center py-1 bg-dark-gray bg-opacity-5 hover:opacity-70">
        Từ chối
      </button>
    </div>
  );
};

export default ApproveButton;
