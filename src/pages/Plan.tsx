import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Plan: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Plan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>Plan</IonContent>
    </IonPage>
  );
};

export default Plan;
