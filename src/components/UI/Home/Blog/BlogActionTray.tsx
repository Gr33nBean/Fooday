import { IonIcon } from "@ionic/react";
import {
  archiveOutline,
  chatbubbleOutline,
  heartOutline,
} from "ionicons/icons";
import { FC, MouseEventHandler } from "react";

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
  return (
    <div>
      <ul className="flex gap-4">
        <li>
          <ActionButton
            onClick={callbacks?.heartCallback}
            icon={heartOutline}
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
        <p>{statistic?.comment} bình luận</p>
        <p>•</p>
        <p>{statistic?.like} lượt thích</p>
      </div>
    </div>
  );
};

export default BlogActionTray;
