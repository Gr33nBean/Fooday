import { IonText } from "@ionic/react";
import { FC, HTMLAttributes } from "react";

export const NewFeedActionButton: FC<
  HTMLAttributes<HTMLButtonElement> & { icon: string; text: string }
> = ({ icon, text, ...props }) => {
  return (
    <button
      {...props}
      className="flex justify-center items-center gap-2 rounded py-1 px-2 transition-colors active:bg-blue-100"
    >
      <img src={icon} alt="icon" />
      <IonText color="medium">
        <p className="text-sm font-bold">{text}</p>
      </IonText>
    </button>
  );
};
