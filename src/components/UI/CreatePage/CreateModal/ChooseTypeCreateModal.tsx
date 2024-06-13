import {
  selectIsOpenCreateModal,
  setIsOpenCreateModal,
} from "@/redux/features/globalModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IonModal } from "@ionic/react";
import SpacingBottom from "../../../common/GlobalModal/SpacingBottom";
import CreateModal from "./CreateModal";
import { useEffect, useState } from "react";
import TitleHeader from "@/components/common/GlobalModal/TitleHeader";
import {
  selectIsCreatePostInEvent,
  setIsCreatePostInEvent,
} from "@/redux/features/dialogSlice";

const ChooseTypeCreateModal = () => {
  const isOpen = useAppSelector(selectIsOpenCreateModal);
  const dispatch = useAppDispatch();
  const [typeCreate, setTypeCreate] = useState<string | undefined>(undefined);
  const isCreatePostInEvent = useAppSelector(selectIsCreatePostInEvent);
  useEffect(() => {
    if (isCreatePostInEvent != -1) {
      setTypeCreate("post");
    }
  }, [isCreatePostInEvent]);

  return (
    <>
      <IonModal
        isOpen={isOpen || isCreatePostInEvent != -1}
        onDidDismiss={() => {
          dispatch(setIsOpenCreateModal(false));
        }}
        initialBreakpoint={1}
        breakpoints={[0, 1]}
      >
        <TitleHeader
          title={"Tạo mới"}
          handleClose={() => {}}
          hideCloseButton={true}
          noBorder={true}
          className="!h-auto py-3 "
        />
        <div className="ion-padding-horizontal w-full">
          <div className="flex w-full flex-col gap-4">
            {TypeCreate.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setTypeCreate(item.type);
                }}
                className="w-full flex items-center gap-2"
              >
                <span className="min-w-[90px] py-1 flex items-center justify-center bg-blue bg-opacity-10 text-blue text-xs font-bold rounded-md capitalize">
                  {item.type}
                </span>
                <p className="text-base font-semibold text-black">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </div>
        <CreateModal
          type={typeCreate}
          isOpen={typeCreate ? true : false}
          handleClose={() => {
            setTypeCreate(undefined);
            if (isCreatePostInEvent != -1) {
              dispatch(setIsCreatePostInEvent(-1));
              dispatch(setIsOpenCreateModal(false));
            }
          }}
        />
        <SpacingBottom />
      </IonModal>
    </>
  );
};

export default ChooseTypeCreateModal;

export const TypeCreate = [
  {
    type: "post",
    name: "Bài đăng",
    onClick: () => {},
  },
  {
    type: "event",
    name: "Sự kiện",
    onClick: () => {},
  },
  {
    type: "device",
    name: "Mượn thiết bị",
    onClick: () => {},
  },
  {
    type: "request",
    name: "Yêu cầu liên đơn vị",
    onClick: () => {},
  },
];
