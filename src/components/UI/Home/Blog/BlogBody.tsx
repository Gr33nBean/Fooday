import { FC } from "react";
import { BlogMetaBarProps } from "./BlogMetaBar";

export type BlogBody = {
  metaInfo: BlogMetaBarProps;
  body: string;
};

export const BlogBody: FC<BlogBody> = ({ body }) => {
  return <></>;
};
