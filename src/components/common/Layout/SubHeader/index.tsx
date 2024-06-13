import { IonBackButton, IonHeader, IonToolbar } from "@ionic/react";

const SubHeader = ({ title }: { title?: string }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="w-full ion-padding-horizontal py-2 flex items-center gap-2 text-sm font-extrabold text-blue">
          <IonBackButton
            text=""
            style={{
              "--icon-font-size": "24px",
            }}
          ></IonBackButton>
          <div className=" flex-1">
            <p className="w-full text-center">{title ?? "Tiêu đề"}</p>
          </div>

          <div className="opacity-0 pointer-events-none">
            <IonBackButton text=""></IonBackButton>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default SubHeader;
