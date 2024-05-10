import { FC, ReactNode, useState } from "react";
import { BlogMetaBar } from "./BlogMetaBar";
import { IndicatorText } from "./BlogTypeIndicator";
import { BlogCarousel } from "./BlogCarousel";
import { BlogTitle } from "./BlogTitle";
import { isTooLong, trimmedBody } from "@/utils/home";
import BlogAttachments from "./BlogAttachments";
import { BlogMentions } from "./BlogMentions";
import BlogActionTray from "./BlogActionTray";
import { BlogLeftColumn } from "./BlogLeftColumn";

export type BlogItemProps = {
  blog: {
    comment: number;
    like: number;
  };
  leftColumn?: ReactNode;
  metaBar?: ReactNode;
  typeIndicator?: ReactNode;
  title?: ReactNode;
  body?: string;
  carousel?: ReactNode;
  mentions?: ReactNode;
  attachments?: ReactNode;
};

const BlogItem: FC<BlogItemProps> & {
  LeftColumn: typeof BlogLeftColumn;
  MetaBar: typeof BlogMetaBar;
  TypeIndicator: typeof IndicatorText;
  ActionTray: typeof BlogActionTray;
  Title: typeof BlogTitle;
  Carousel: typeof BlogCarousel;
  Mentions: typeof BlogMentions;
  Attachments: typeof BlogAttachments;
} = ({
  blog,
  leftColumn,
  metaBar,
  typeIndicator,
  title,
  body,
  carousel,
  mentions,
  attachments,
}) => {
  const [showingAllBody, setShowingAllBody] = useState(false);

  const bodyTooLong = isTooLong()(body);

  const bodyToShow = bodyTooLong && !showingAllBody ? trimmedBody(body) : body;

  return (
    <div className="flex gap-2 w-full">
      {leftColumn}
      <div className="flex flex-col gap-2 w-full">
        {metaBar}

        <div className="flex items-center justify-start gap-2">
          {typeIndicator}
          {title}
        </div>

        <div>
          {bodyToShow}
          {bodyTooLong && (
            <button
              className="text-medium font-bold active:text-black"
              onClick={() => setShowingAllBody(true)}
            >
              Xem thêm...
            </button>
          )}
        </div>

        {carousel}
        {mentions}
        {attachments}

        <div>
          <BlogActionTray
            statistic={{
              comment: blog.comment,
              like: blog.like,
            }}
          />
        </div>
      </div>
    </div>
  );
};

BlogItem.LeftColumn = BlogLeftColumn;
BlogItem.MetaBar = BlogMetaBar;
BlogItem.TypeIndicator = IndicatorText;
BlogItem.ActionTray = BlogActionTray;
BlogItem.Title = BlogTitle;
BlogItem.Carousel = BlogCarousel;
BlogItem.Mentions = BlogMentions;
BlogItem.Attachments = BlogAttachments;

export default BlogItem;
