import { IonText } from "@ionic/react";
import { FC } from "react";

export type BlogMentionProps = {
  firstMentions: string[];
  restMentionsCount: number;
};

export const BlogMentions: FC<BlogMentionProps> = ({
  firstMentions,
  restMentionsCount,
}) => {
  return (
    <div className="flex items-center gap-1">
      {firstMentions.map((mention, index) => {
        return (
          <IonText
            key={index}
            color="primary"
            className="font-bold transition-colors active:text-secondary"
          >
            <p>@{mention}</p>
          </IonText>
        );
      })}
      {restMentionsCount > 0 && (
        <IonText
          color="medium"
          className="text-sm transition-colors active:text-dark"
        >
          + {restMentionsCount} người khác
        </IonText>
      )}
    </div>
  );
};
