import { Event } from "@/services/type";
import ShortEvent from "../ShortEvent";
import { useState } from "react";

const TodayEvent = ({ data }: { data?: Event[] }) => {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  return (
    <div className="w-full pt-5 rounded-2xl flex flex-col border border-extra-light-gray">
      <p className="text-[24px] font-bold w-full text-start px-5 pb-3 text-black">
        Sự kiện hôm nay
      </p>

      {data?.slice(0, isShowAll ? data?.length ?? 0 : 3).map((item, index) => (
        <div className="w-full" key={index}>
          <ShortEvent
            id={item?.id ?? 0}
            name={item?.name ?? ""}
            room={item?.resource?.name ?? ""}
            time={new Date(item.startAt * 1000)}
            des={item?.description ?? ""}
          />
        </div>
      ))}

      {data?.length == 0 ? (
        <p className="w-full text-center py-3 cursor-pointer text-dark-gray text-[18px] font-normal">
          Không có sự kiện trong ngày
        </p>
      ) : (
        <>
          {data && data.length > 3 && (
            <p
              className="w-full text-center py-3 cursor-pointer text-blue hover:underline text-[18px] font-normal"
              onClick={() => setIsShowAll(!isShowAll)}
            >
              {isShowAll ? "Thu gọn" : "Xem tất cả"}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TodayEvent;
