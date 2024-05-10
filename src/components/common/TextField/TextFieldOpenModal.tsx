import { IonModal } from "@ionic/react";
import React from "react";
import SpacingBottom from "../GlobalModal/SpacingBottom";
import TitleHeader from "../GlobalModal/TitleHeader";

const TextFieldOpenModal = ({
  value,
  title,
  placeholder,
  contentModal,
}: {
  value: string;
  onChange: (value: string) => void;
  title: string;
  placeholder?: string;
  contentModal?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="w-full cursor-pointer" onClick={() => setIsOpen(true)}>
        <p className="w-full flex items-center">
          <span className="flex-1 text-base font-semibold text-black">
            {title}
          </span>
        </p>
        <p
          className={`w-full text-sm leading-[24px] font-normal transition-all overflow-auto duration-300 ${
            value ? "text-black" : "text-dark-gray opacity-70"
          }`}
        >
          {value ? value : placeholder ?? ""}
        </p>
      </div>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        initialBreakpoint={1}
        breakpoints={[0, 1]}
      >
        <TitleHeader
          title={placeholder}
          handleClose={() => setIsOpen(false)}
          hideCloseButton={true}
          noBorder={true}
          className="!h-auto py-3 "
        />
        <div className="w-full ion-padding-horizontal">{contentModal}</div>
        <SpacingBottom />
      </IonModal>
    </>
  );
};

export default TextFieldOpenModal;
