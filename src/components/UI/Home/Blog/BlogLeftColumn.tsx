import { IonAvatar } from "@ionic/react";
import { FC } from "react";

export type BlogLeftColumnProps = {
  avatar: string;
};

export const BlogLeftColumn: FC<BlogLeftColumnProps> = ({ avatar }) => {
  return (
    <div className="flex flex-col justify-start items-center gap-2">
      <IonAvatar className="w-8 h-8">
        <img
          alt="User avatar's head"
          src={avatar}
          className="w-8 aspect-square object-cover"
        />
      </IonAvatar>
      <div className="w-[1px] h-full bg-[var(--ion-color-medium)]"></div>
    </div>
  );
};
