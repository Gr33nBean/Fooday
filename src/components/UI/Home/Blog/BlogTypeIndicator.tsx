import { FC } from "react";

export type IndicatorTextProps = {
  children: string;
};

export const IndicatorText: FC<IndicatorTextProps> = ({ children }) => {
  return (
    <p className="rounded px-2 py-1 font-bold text-xs text-[#1DA1F2] text-nowrap bg-[#1DA1F219]">
      {children}
    </p>
  );
};
