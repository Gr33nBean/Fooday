import { useMemo } from "react";
import PostBase, { PostBaseType } from "../PostBase";
import LongContent from "../PostBase/LongContent";
import { MoreOptionsType } from "../PostBase/MoreOptions";

export type EventProps = PostBaseType & {
  id: number;
  content: string;
  room: string;
  from: string;
  to: string;
  isDetail?: boolean;
};

const Event = ({
  id,
  userName,
  createdAt,
  tag,
  name,
  joinAmount,
  content,
  room,
  from,
  to,
  isDetail,
  avatar,
  uid,
}: EventProps) => {
  const openDetail: string | undefined = useMemo(() => {
    if (isDetail) {
      return undefined;
    }
    const type: MoreOptionsType = "event";
    return type + "/" + id;
  }, [id]);

  return (
    <PostBase
      userName={userName}
      createdAt={createdAt}
      tag={tag}
      name={name}
      joinAmount={joinAmount}
      typeTag="event"
      avatar={avatar}
      uid={uid}
      id={id}
      type="event"
      openDetail={openDetail}
    >
      <div className="w-full flex flex-col gap-1">
        <LongContent content={content} />

        <div
          className={`flex flex-col bg-orange bg-opacity-10 w-full rounded-sm text-orange text-sm py-3`}
        >
          {room && (
            <>
              <p
                className={`flex items-center justify-center text-center font-extrabold`}
              >
                Room {room}
              </p>
              <div className="w-full py-2">
                <div className="w-full border-b border-extra-extra-light-gray h-[1px]"></div>
              </div>
            </>
          )}

          <div
            className={`flex flex-1 justify-center items-center gap-2 text-center  font-bold  `}
          >
            <span>{from}</span>
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.83333 4.99999H10.1667M10.1667 4.99999L6.83333 1.66666M10.1667 4.99999L6.83333 8.33332"
                stroke="#F77C00"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span>{to}</span>
          </div>
        </div>

        {isDetail && (
          <button className="w-full mt-1 text-center py-2 border border-blue rounded-md text-blue text-sm font-semibold bg-blue bg-opacity-5 hover:opacity-70">
            Xác nhận tham gia
          </button>
        )}
      </div>
    </PostBase>
  );
};

export default Event;
