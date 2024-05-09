import React from "react";
import DayPlan from "./DayPlan";
import { DayPlanType } from "./type";

const PlanContent = () => {
  const [planData, setPlanData] = React.useState<DayPlanType[]>([
    ...new Array(5).fill({
      date: 1600000000,
      order: 1,
      mealPlans: [
        ...new Array(2).fill({
          time: 1600000000,
          foodCards: [
            ...new Array(5).fill({
              name: "Hambuger",
              cal: 100,
              ingredientsLength: 15,
              totalTime: 30,
            }),
          ],
        }),
      ],
    }),
  ]);
  return (
    <div className=" w-full flex flex-col gap-2 pb-2">
      {planData.map((item, index) => (
        <div
          key={index}
          className={`pt-2 ${index === 0 ? "" : "border-t border-primary"}`}
        >
          <div className="ion-padding-horizontal">
            <DayPlan
              item={{
                ...item,
                order: index + 7,
                date:
                  (new Date().getTime() + index * 1000 * 60 * 60 * 24) / 1000,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanContent;
