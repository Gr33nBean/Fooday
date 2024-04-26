import { FC, HTMLAttributes, ReactNode } from "react";
import BlogActionTray from "./BlogActionTray";

export type BlogItemProps = {
  blog: {
    comment: number;
    like: number;
    cloned: number;
  };
  leftColumn?: ReactNode;
  metaBar?: ReactNode;
  body?: ReactNode;
  carousel?: ReactNode;
  diet?: ReactNode;
};

const BlogItem: FC<BlogItemProps> = ({
  blog,
  leftColumn,
  metaBar,
  body,
  carousel,
  diet,
}) => {
  return (
    <div className="flex p-4 gap-2 w-full">
      {leftColumn}
      <div className="flex flex-col gap-2 w-full">
        {metaBar}
        <p className="text-lg leading-5">{body}</p>
        {carousel}
        {diet}
        <div>
          <BlogActionTray
            statistic={{
              comment: blog.comment,
              like: blog.like,
              cloned: blog.cloned,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
