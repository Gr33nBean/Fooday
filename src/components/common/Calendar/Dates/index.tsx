import { selectSelectDate, setSelectDate } from "@/redux/features/accountSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Event } from "@/services/type";
import { PopoverGroup } from "@headlessui/react";
import { useMemo } from "react";

const Dates = ({
  monthAndYear,
  data,
}: {
  monthAndYear: {
    month: number;
    year: number;
  };
  data?: Event[];
}) => {
  const dispatch = useAppDispatch();
  const allDays = useMemo(() => {
    const { startDate, endDate } = getDateRange(
      monthAndYear.year,
      monthAndYear.month
    );
    return getAllDatesInRange(startDate, endDate);
  }, [monthAndYear]);

  const selectDate = useAppSelector(selectSelectDate);

  return (
    <PopoverGroup>
      <div className="w-full grid grid-cols-7 gap-2 transition-all duration-150">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((item, index) => (
          <p
            key={index}
            className="text-[18px] font-semibold text-black w-full text-center"
          >
            {item}
          </p>
        ))}

        {allDays.map((item, index) => {
          const isSelected =
            item.getDate() === selectDate.getDate() &&
            item.getMonth() + 1 === selectDate.getMonth() + 1 &&
            item.getFullYear() === selectDate.getFullYear();

          const isToday =
            item.getDate() === new Date().getDate() &&
            item.getMonth() + 1 === new Date().getMonth() + 1 &&
            item.getFullYear() === new Date().getFullYear();

          const isThisMonth = item.getMonth() + 1 === monthAndYear.month;

          const eventThisDate = data?.filter((event) => {
            const start = new Date(event.startAt * 1000);

            return (
              start.getDate() === item.getDate() &&
              start.getMonth() + 1 === item.getMonth() + 1 &&
              start.getFullYear() === item.getFullYear()
            );
          });
          return (
            <button
              key={index}
              className={`w-full rounded-md aspect-square flex items-center justify-center relative  transition-all duration-150 cursor-pointer ${
                !isSelected && isToday ? "bg-orange text-white" : ""
              } ${isSelected ? "bg-blue text-white" : ""}`}
              disabled={!isThisMonth}
              onClick={() => {
                if (isSelected) {
                  return;
                }
                dispatch(setSelectDate(item));
              }}
            >
              {/*  */}
              <p
                className={`${
                  isThisMonth ? "text-black text-inherit" : "text-light-gray"
                } w-full text-[14px] font-normal text-center `}
              >
                {item.getDate()}
              </p>

              {/*  */}
              {isThisMonth && (
                <div
                  className={`absolute w-full left-0 bottom-0 flex items-center justify-evenly py-[2px]`}
                >
                  {eventThisDate?.map((_, index) => (
                    <div
                      key={index}
                      className={`aspect-square size-[6px] rounded-full ${
                        isSelected ? "bg-white" : "bg-orange"
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </PopoverGroup>
  );
};

export default Dates;

function getDateRange(
  year: number,
  month: number
): { startDate: Date; endDate: Date } {
  // Ngày đầu tiên của tháng
  const firstDayOfMonth = new Date(year, month - 1, 1);

  // Tính toán ngày đầu tiên là thứ Hai của tuần đầu tiên chứa ngày đầu tiên của tháng
  const firstDayWeekday = firstDayOfMonth.getDay();
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(firstDayOfMonth.getDate() - ((firstDayWeekday + 6) % 7));

  // Ngày cuối cùng của tháng
  const lastDayOfMonth = new Date(year, month, 0);

  // Tính toán ngày Chủ nhật cuối cùng của tuần chứa ngày cuối cùng của tháng
  const lastDayWeekday = lastDayOfMonth.getDay();
  const endDate = new Date(lastDayOfMonth);
  if (lastDayWeekday === 0) {
    endDate.setDate(lastDayOfMonth.getDate());
  } else endDate.setDate(lastDayOfMonth.getDate() + (7 - lastDayWeekday));

  return { startDate, endDate };
}

function getAllDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
