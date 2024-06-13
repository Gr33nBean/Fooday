import { SCREEN_WIDTH } from "@/constants/responsive";
import { IonText } from "@ionic/react";
import { FC, useMemo } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export type BlogMentionProps = {
  firstMentions: string[];
  restMentionsCount: number;
};

export const BlogMentions: FC<BlogMentionProps> = ({
  firstMentions,
  restMentionsCount,
}) => {
  const { width: windowWidth } = useWindowSize();

  const toShowMentions = useMemo(
    () =>
      window.innerWidth <= SCREEN_WIDTH.MOBILE_S
        ? firstMentions.slice(0, 2)
        : firstMentions,
    [windowWidth]
  );

  return (
    <div className="flex items-center gap-1">
      <p className="text-primary font-bold transition-colors active:text-secondars">
        {toShowMentions.map((mention, index) => (
          <span key={index}>@{mention} </span>
        ))}
      </p>

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
