import { DayPlanType } from "../type";
import { getDayOfWeek, getddmmyyyy } from "../utils";
import moreIcon from "@assets/images/plan/More_Horizontal.svg";
import MealPlan from "../MealPlan";

const DayPlan = ({ item }: { item: DayPlanType }) => {
  const date = new Date(item.date * 1000);

  return (
    <div className="w-full ">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Order order={item.order} />
          <div className="flex-1 font-manrope text-base text-black">
            <p className="w-full font-bold">{getDayOfWeek(date.getDay())}</p>
            <p className="w-full">
              {getddmmyyyy(date)} • {item.mealPlans.length} bữa •
              {item.mealPlans.reduce(
                (a, b) => a + b.foodCards.reduce((c, d) => c + d.cal, 0),
                0
              )}{" "}
              cal
            </p>
          </div>
        </div>

        <div className="size-6">
          <img
            src={moreIcon}
            alt="hambuger"
            className="size-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-start gap-2 w-full pt-2">
        <div className="opacity-0">
          <Order order={item.order} />
        </div>
        <div className="flex-1 max-w-[calc(100%-48px-16px)] flex flex-col">
          {item.mealPlans.map((item, index, arr) => (
            <div className="" key={index}>
              <MealPlan
                item={{
                  ...item,
                  time:
                    (new Date().getTime() + index * 1000 * 60 * 60 * 2) / 1000,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayPlan;

function Order({ order }: { order: number }) {
  return (
    <p className="size-[48px] font-manrope text-xl font-bold rounded-full flex items-center justify-center bg-black text-white">
      {order}
    </p>
  );
}
