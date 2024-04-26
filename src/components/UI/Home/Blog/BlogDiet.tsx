import React, { FC } from "react";

type BlogDietProps = {
  planLength: number;
  mealsPerDay: number;
  caloriesPerDay: number;
};

export const BlogDiet: FC<BlogDietProps> = ({
  planLength,
  mealsPerDay,
  caloriesPerDay,
}) => {
  return (
    <div className="flex justify-between items-center border border-medium rounded-xl shadow-xl p-3">
      <div className="flex flex-col">
        <p className="text-lg font-bold text-medium">
          Diet 16-08 &gt; My April{" "}
        </p>
        <p>
          {planLength} ngày: {mealsPerDay} bữa • {caloriesPerDay} cal mỗi ngày{" "}
        </p>
      </div>

      <span className="relative w-12 rounded-full aspect-square p-4 bg-medium">
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primaryContrast text-white text-lg font-bold">
          {mealsPerDay}
        </p>
      </span>
    </div>
  );
};
