import { IonAvatar, IonIcon } from "@ionic/react";
import { FC, useState } from "react";
import { IndicatorText } from "../Blog/BlogTypeIndicator";
import { Event } from "@/types/home/Event";
import dayjs from "dayjs";
import { VietnameseTimeUnitMap, getFormattedDiffTime } from "@/utils/time";
import { isTooLong, trimmedBody } from "@/utils/home";
import { returnDownForwardOutline, stopwatchOutline } from "ionicons/icons";

export type EventCardProps = {
  event: Event;
};

export const EventCard: FC<EventCardProps> = ({ event }) => {
  const [expanded, setExpanded] = useState(false);

  const isContentTooLong = isTooLong()(event.content);
  const content =
    isContentTooLong && !expanded ? trimmedBody(event.content) : event.content;

  return (
    <div className="rounded-xl p-4 shadow-xl">
      <div className="flex items-center gap-2">
        <IonAvatar>
          <img
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>
        <div>
          <p>{event.publisher.username}</p>
          <div className="flex items-center gap-1">
            <IndicatorText>{event.publisher.indicator}</IndicatorText>
            <p className="text-xs font-bold text-medium">
              {event.participantsCount} người tham gia
            </p>
          </div>
        </div>
        <p className="flex-1 text-xs text-right">
          {getFormattedDiffTime(
            dayjs().diff(dayjs(event.createdAt.toString()))
          ).getFormattedText(
            (value, unit) =>
              `${value.toString().padStart(2, "0")} ${
                VietnameseTimeUnitMap[unit]
              }`
          )}
        </p>
      </div>

      <div className="mt-2">
        <p className="font-bold">{event.title}</p>
        <p>{content}</p>
        {isContentTooLong && !expanded && (
          <button
            className="text-medium font-bold"
            onClick={() => setExpanded(true)}
          >
            Đọc thêm...
          </button>
        )}
      </div>

      <div className="grid grid-cols-[3fr_1px_7fr] rounded mt-2 text-light font-bold bg-primary">
        <div className="grid grid-rows-2 justify-items-center p-2">
          <p>Room</p>
          <p>A1.03</p>
        </div>
        <div className="w-[1px] bg-light"></div>
        <div className="grid grid-rows-2 justify-items-center p-2">
          <p>
            <span className="flex items-center gap-2">
              <IonIcon icon={stopwatchOutline} />
              08:00 10/05/2024
            </span>
          </p>
          <p>
            <span className="flex items-center gap-2">
              <IonIcon icon={returnDownForwardOutline} />
              09:00 10/05/2024
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
