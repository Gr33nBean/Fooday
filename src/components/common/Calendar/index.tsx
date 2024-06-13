import { Event } from "@/services/type";
import { useState } from "react";
import Dates from "./Dates";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectDate } from "@/redux/features/accountSlice";

const Calendar = ({ data }: { data?: Event[] }) => {
  const [monthAndYear, setMonthAndYear] = useState<{
    month: number;
    year: number;
  }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const handleChange = (increase: boolean) => {
    const newDate = new Date(monthAndYear.year, monthAndYear.month - 1, 1);

    if (increase) {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setMonthAndYear({
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
    });
  };

  const dispatch = useAppDispatch();

  return (
    <div className="w-full ion-padding flex flex-col  gap-3">
      <div className="w-full flex items-center justify-between text-black">
        <button onClick={() => handleChange(false)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 15L10 12L13 9M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className=" text-center text-base font-bold"
          onClick={() => {
            setMonthAndYear({
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
            });
            dispatch(setSelectDate(new Date()));
          }}
        >
          Tháng {monthAndYear.month} {monthAndYear.year}
        </button>
        <button onClick={() => handleChange(true)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 9L14 12L11 15M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="w-full">
        <Dates data={data} monthAndYear={monthAndYear} />
      </div>
    </div>
  );
};

export default Calendar;
