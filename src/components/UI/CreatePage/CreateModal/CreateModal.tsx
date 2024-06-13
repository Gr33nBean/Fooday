import Event from "@/components/common/Dialog/Create/Event";
import Post from "@/components/common/Dialog/Create/Post";
import Request from "@/components/common/Dialog/Create/Request";
import Resource from "@/components/common/Dialog/Create/Resource";
import SpacingBottom from "@/components/common/GlobalModal/SpacingBottom";
import TitleHeader from "@/components/common/GlobalModal/TitleHeader";
import { IonModal } from "@ionic/react";
import { TypeCreate } from "./ChooseTypeCreateModal";

const CreateModal = ({
  type,
  isOpen,
  handleClose,
}: {
  type?: string;
  isOpen: boolean;
  handleClose: () => void;
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={handleClose}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <div className="h-[95svh] relative  overflow-y-auto">
        {/*  */}
        <div className="sticky top-0 z-20 w-full bg-white">
          <TitleHeader
            title={
              type ? TypeCreate.find((item) => item.type === type)?.name : ""
            }
            handleClose={handleClose}
          />
        </div>

        {/*  */}
        <div className="ion-padding">
          {type === "post" && <Post handleClose={handleClose} />}
          {type == "event" && <Event handleClose={handleClose} />}
          {type == "device" && <Resource handleClose={handleClose} />}
          {type == "request" && <Request handleClose={handleClose} />}
        </div>

        {/*  */}
        <SpacingBottom />
      </div>
    </IonModal>
  );
};

export default CreateModal;
