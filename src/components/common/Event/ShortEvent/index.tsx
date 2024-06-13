import { getColorFromType } from "@/constants/type";
import Tag from "../../Tag";
// import { useNavigate } from "react-router-dom";

const ShortEvent = ({
  id,
  name,
  room,
  time,
  des,
}: {
  id: number;
  name: string;
  room: string;
  des: string;
  time: Date;
}) => {
  // const navigate = useNavigate();
  return (
    <div
      className="w-full flex flex-col gap-1 px-5 py-3 hover:bg-extra-extra-light-gray cursor-pointer"
      onClick={() => {
        // navigate(`/event/${id}`);
      }}
    >
      <Tag text="Welcome" color={getColorFromType("event")} />
      <p className="w-full font-semibold text-[18px] text-black truncate">
        {name}
      </p>

      <p className="w-full font-normal text-[16px] text-dark-gray paragraph-overflow-ellipsis paragraph-overflow-ellipsis-1 max-w-[260px]">
        {room ? `Tại ${room} lúc ${getTime(time)}` : des}
      </p>
    </div>
  );
};

export default ShortEvent;

function getTime(value: Date) {
  // format: hh:mm
  return `${value.getHours().toString().padStart(2, "0")}:${value
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}
