import { IonText } from "@ionic/react";
import { FC } from "react";

export type BlogMentionProps = {
  firstThreeMentions: string[];
  restMentionsCount: number;
};

export const BlogMentions: FC<BlogMentionProps> = ({
  firstThreeMentions,
  restMentionsCount,
}) => {
  return (
    <div className="flex items-center gap-1">
      {firstThreeMentions.map((mention, index) => {
        return (
          <IonText key={index} color="primary" className="font-bold">
            <p>@{mention}</p>
          </IonText>
        );
      })}
      {restMentionsCount > 0 && (
        <IonText color="medium" className="text-sm">
          + {restMentionsCount} người khác
        </IonText>
      )}
    </div>
  );
};
