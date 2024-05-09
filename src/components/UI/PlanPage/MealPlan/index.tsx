import React from "react";
import { MealPlanType } from "../type";
import FoodCard from "../FoodCard";

const MealPlan = ({ item }: { item: MealPlanType }) => {
  const date = new Date(item.time * 1000);

  return (
    <div className="w-full border-t border-primary py-2">
      <div className=" w-full justify-between flex items-center font-manrope text-sm">
        <p className="px-2 py-1 rounded-lg bg-black text-white  font-bold">
          {date.getHours()}:{date.getMinutes()}
        </p>

        <p className="px-2 py-1 rounded-lg border border-primary text-primary font-normal">
          {item.foodCards.length + " món"} •{" "}
          {item.foodCards.reduce((a, b) => a + b.cal, 0) + " cal"}
        </p>
      </div>

      <div className="w-full max-w-full overflow-auto">
        <div className="overflow-visible flex items-center gap-2">
          {item.foodCards.map((item, index, arr) => (
            <div
              key={index}
              className="w-fit"
              style={{
                paddingLeft: index === 0 ? "4px" : "0px",
                paddingRight: index === arr.length - 1 ? "4px" : "0px",
              }}
            >
              <div className="w-[280px] min-w-[280px] h-fit py-2">
                <FoodCard item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
