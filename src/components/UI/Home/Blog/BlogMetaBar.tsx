import { IonAvatar, IonIcon } from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import { FC } from "react";

export type BlogMetaBarProps = {
  avatar?: string;
  username: string;
  createdAt: string;
};

export const BlogMetaBar: FC<BlogMetaBarProps> = ({
  avatar,
  username,
  createdAt,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        {avatar && (
          <IonAvatar className="w-8 h-8">
            <img
              alt="User avatar's head"
              src={avatar}
              className="w-8 aspect-square object-cover"
            />
          </IonAvatar>
        )}
        <p className="font-semibold text-lg">{username}</p>
      </div>
      <div className="flex justify-center items-center gap-4 ">
        <p className="text-medium">{createdAt}</p>
        <button className="flex justify-center items-center" onClick={() => {}}>
          <IonIcon icon={ellipsisHorizontal} />
        </button>
      </div>
    </div>
  );
};
