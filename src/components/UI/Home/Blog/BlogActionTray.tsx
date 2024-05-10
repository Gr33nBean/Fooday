import { IonIcon } from "@ionic/react";
import {
  archiveOutline,
  chatbubbleOutline,
  heart,
  heartOutline,
} from "ionicons/icons";
import { FC, MouseEventHandler, useState } from "react";

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
      <IonIcon slot="icon-only" icon={icon} className="text-xl"></IonIcon>
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
            icon={hearted ? heart : heartOutline}
          />
        </li>
        <li>
          <ActionButton
            onClick={callbacks?.commentCallback}
            icon={chatbubbleOutline}
          />
        </li>
        <li>
          <ActionButton
            onClick={callbacks?.unknownActionCallback}
            icon={archiveOutline}
          />
        </li>
      </ul>
      <div className="flex items-center gap-1">
        <p className="transition-colors active:text-medium">
          {statistic?.comment} bình luận
        </p>
        <p>•</p>
        <p className="transition-colors active:text-medium">
          {statistic?.like} lượt thích
        </p>
      </div>
    </div>
  );
};

export default BlogActionTray;
