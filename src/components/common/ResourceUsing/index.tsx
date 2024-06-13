import { ApprovalStatus } from "@/services/type";
import PostBase, { PostBaseType } from "../PostBase";
import { getFormatDateString } from "@/utils";
import Tag from "../Tag";
import ApproveButton from "../PostBase/ApproveButton";
import { getColorFromType, getWording } from "@/constants/type";

export type ResourceUsingProps = PostBaseType & {
  resource: {
    name: string;
    description: string;
    images: string[];
    resourceType: string;
  };
  startAt: Date;
  endAt: Date;
  decidedAt?: Date;
  decisionDetail?: string;
  approvalStatus: ApprovalStatus;
  reporter?: string;
  isNeedApproval?: boolean;
};

const ResourceUsing = ({
  userName,
  avatar,
  createdAt,
  tag,
  name,
  resource,
  startAt,
  endAt,
  decidedAt,
  decisionDetail,
  approvalStatus,
  reporter,
  isNeedApproval,
  uid,
  id,
}: ResourceUsingProps) => {
  const color = getColorFromType("resource");

  return (
    <PostBase
      id={id}
      type="resourceUsing"
      userName={userName}
      createdAt={createdAt}
      avatar={avatar}
      tag={tag}
      name={name}
      typeTag={"resource"}
      uid={uid}
      isResource={true}
    >
      <div className="w-full flex flex-col gap-1 text-sm font-normal text-black">
        <p>Bắt đầu: {getFormatDateString(startAt)}</p>
        <p>Kết thúc: {getFormatDateString(endAt)}</p>
        <p
          style={{
            display: approvalStatus ? "block" : "none",
          }}
        >
          Trạng thái: {getWording(approvalStatus)}
          {
            <>
              {approvalStatus == "pending" ? (
                ""
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

        <div
          className="w-full rounded-lg overflow-hidden p-2 px-3  flex items-center "
          style={{
            backgroundColor: color + "20",
          }}
        >
          <div className="size-[32px] rounded-full overflow-hidden border border-extra-extra-light-gray">
            <img
              src={resource.images[0]}
              alt=""
              className="size-fill object-cover object-center"
            />
          </div>

          <div className="w-[calc(100%-32px-24px)] px-2 text-sm font-normal text-black">
            <p className="font-bold truncate">{resource.name}</p>
            <Tag text={resource.resourceType} color={color} />
          </div>

          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#657786"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
        </div>

        {isNeedApproval && (
          <ApproveButton type="resourceUsing" id={id} color={color} />
        )}
      </div>
    </PostBase>
  );
};

export default ResourceUsing;
