import SubHeader from "@/components/common/Layout/SubHeader";
import { MoreOptionsType } from "@/components/common/PostBase/MoreOptions";
import { IonContent } from "@ionic/react";
import { useMemo } from "react";
import PostDetail from "./PostDetail";
import EventDetail from "./EventDetail";

const OpenDetail = ({ openDetail }: { openDetail?: string }) => {
  const {
    type,
    id,
  }: {
    type: MoreOptionsType | "";
    id: string;
  } = useMemo(() => {
    if (openDetail) {
      const [type, id] = openDetail.split("/");
      return { type: type as MoreOptionsType, id };
    }
    return { type: "", id: "" };
  }, [openDetail]);
  return (
    <>
      <SubHeader title={"Chi tiết"} />
      <IonContent fullscreen>
        {type && id ? (
          <>
            {type == "post" && <PostDetail id={id} />}
            {type == "event" && <EventDetail id={id} />}
          </>
        ) : (
          <div className="w-full py-3 text-center">Không tìm thấy</div>
        )}
      </IonContent>
    </>
  );
};

export default OpenDetail;
