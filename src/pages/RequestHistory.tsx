import MoreOptionsBorder from "@/components/common/Button/MoreOptionsBorder";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const RequestHistory: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lịch ăn</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="ion-padding-horizontal">
          <IonToolbar>
            <div className="w-full flex items-center gap-1">
              <p className="flex-1">
                <IonTitle size="large" className="ion-no-padding">
                  Yêu cầu
                </IonTitle>
              </p>
              <MoreOptionsBorder />
            </div>

            {/* breadcrumbs  */}
            {/* <div className="w-full flex items-center gap-1">
              {[
                {
                  name: "Diet 16-08",
                  onClick: () => {},
                },
                {
                  name: "My April",
                  onClick: () => {},
                },
                {
                  name: "Ngày thứ 7",
                },
              ].map((item, index, arr) => {
                return (
                  <div key={index} className="flex items-center gap-1">
                    <p
                      onClick={item.onClick}
                      className={` ${
                        item.onClick ? "hover:underline cursor-pointer" : ""
                      } text-inherit`}
                    >
                      {item.name}
                    </p>
                    {index !== arr.length - 1 ? (
                      <span className="text-inherit">{">"}</span>
                    ) : null}
                  </div>
                );
              })}
            </div> */}
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default RequestHistory;
