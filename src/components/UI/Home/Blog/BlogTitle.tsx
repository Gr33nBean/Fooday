import { FC, PropsWithChildren } from "react";

export const BlogTitle: FC<PropsWithChildren> = ({ children }) => {
  return <p className="font-bold">{children}</p>;
};
