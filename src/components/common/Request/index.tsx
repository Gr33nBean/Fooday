import { ApprovalStatus } from "@/services/type";
import PostBase, { PostBaseType } from "../PostBase";
import { getFormatDateString } from "@/utils";
import ApproveButton from "../PostBase/ApproveButton";
import { getColorFromType, getWording } from "@/constants/type";

export type RequestProps = PostBaseType & {
  description: string; // text
  startAt: Date; // timestamp
  endAt: Date; // timestamp
  decidedAt?: Date; // timestamp
  decisionDetail?: string;
  approvalStatus: ApprovalStatus;
  reporter?: string;
  isNeedApproval?: boolean;
};

const Request = ({
  userName,
  createdAt,
  avatar,
  tag,
  name,
  description,
  startAt,
  endAt,
  decidedAt,
  decisionDetail,
  approvalStatus,
  reporter,
  isNeedApproval,
  uid,
  id,
}: RequestProps) => {
  return (
    <PostBase
      id={id}
      type="request"
      userName={userName}
      createdAt={createdAt}
      avatar={avatar}
      tag={tag}
      name={name}
      typeTag={"request"}
      uid={uid}
    >
      <div className="w-full flex flex-col gap-1 text-sm font-normal text-black">
        <p>Mô tả: {description}</p>
        <p>Bắt đầu: {getFormatDateString(startAt)}</p>
        <p>Kết thúc: {getFormatDateString(endAt)}</p>
        <p>
          Trạng thái: {getWording(approvalStatus)}
          {
            <>
              {approvalStatus === "pending" ? (
                <></>
              ) : (
                <>
                  {decidedAt ? " lúc " + getFormatDateString(decidedAt) : ""}
                  {decisionDetail ? ". Mô tả: " + decisionDetail : ""}
                </>
              )}
            </>
          }
        </p>

        {reporter && (
          <p>
            Người báo cáo:
            <span className="font-bold text-blue"> @{reporter}</span>
          </p>
        )}

        {isNeedApproval && (
          <ApproveButton
            type="request"
            id={id}
            color={getColorFromType("request")}
          />
        )}
      </div>
    </PostBase>
  );
};

export default Request;
