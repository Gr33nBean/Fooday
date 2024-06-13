import { useEffect, useRef, useState } from "react";

function LongContent({ content }: { content: string }) {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const [isEllipsis, setIsEllipsis] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current?.scrollHeight) {
      if (ref.current.scrollHeight > 72) {
        setIsEllipsis(true);
      }
    }
  }, [ref.current?.scrollHeight, content]);

  return (
    <div className="w-full pb-2">
      <div
        ref={ref}
        className={`${
          isShowMore ? "" : "paragraph-overflow-ellipsis"
        } text-sm font-normal w-full leading-[24px] transition-all duration-300`}
      >
        {content}
      </div>
      {isEllipsis && (
        <button
          className={`text-sm font-medium text-dark-gray`}
          onClick={() => {
            setIsShowMore(!isShowMore);
          }}
        >
          {isShowMore ? "Thu gọn" : "Xem thêm"}
        </button>
      )}
    </div>
  );
}

export default LongContent;
