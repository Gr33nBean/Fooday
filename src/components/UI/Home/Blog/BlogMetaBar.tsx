import { getFormattedDiffTime, VietnameseTimeUnitMap } from "@/utils/time";
import { IonAvatar, IonIcon, IonText } from "@ionic/react";
import dayjs from "dayjs";
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
  const diffFromCreatedAt = getFormattedDiffTime(
    dayjs().diff(dayjs(createdAt.toString()))
  ).getFormattedText(
    (value, unit) =>
      `${value.toString().padStart(2, "0")} ${VietnameseTimeUnitMap[unit]}`
  );

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
        <IonText color="dark">
          <p className="font-semibold text-md">{username}</p>
        </IonText>
      </div>
      <div className="flex justify-center items-center gap-4 ">
        <p className="text-medium">{diffFromCreatedAt}</p>
        <button className="flex justify-center items-center" onClick={() => {}}>
          <IonIcon icon={ellipsisHorizontal} />
        </button>
      </div>
    </div>
  );
};
