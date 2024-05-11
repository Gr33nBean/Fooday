import { FC, MouseEventHandler, useState } from "react";

import { heart, comment, share } from "@assets/icons";

type BlogActionTrayProps = {
  statistic?: {
    comment?: number;
    like?: number;
  };
  callbacks?: {
    heartCallback?: () => void;
    commentCallback?: () => void;
    unknownActionCallback?: () => void;
  };
};

type ActionButtonProps = {
  icon: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

const ActionButton: FC<ActionButtonProps> = ({ icon, onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={icon} alt="icon" />
    </button>
  );
};

const BlogActionTray: FC<BlogActionTrayProps> = ({ statistic, callbacks }) => {
  const [hearted, setHearted] = useState(false);

  return (
    <div>
      <ul className="flex gap-4">
        <li>
          <ActionButton
            onClick={() => {
              if (callbacks?.heartCallback) callbacks.heartCallback();
              setHearted(!hearted);
            }}
            icon={heart}
          />
        </li>
        <li>
          <ActionButton onClick={callbacks?.commentCallback} icon={comment} />
        </li>
        <li>
          <ActionButton
            onClick={callbacks?.unknownActionCallback}
            icon={share}
          />
        </li>
      </ul>
      <div className="flex items-center gap-1">
        <button className="transition-colors active:text-medium">
          {statistic?.comment} bình luận
        </button>
        <p>•</p>
        <button className="transition-colors active:text-medium">
          {statistic?.like} lượt thích
        </button>
      </div>
    </div>
  );
};

export default BlogActionTray;
