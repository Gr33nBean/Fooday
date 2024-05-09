import MoreOptionsBorder from "@/components/common/Button/MoreOptionsBorder";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { FoodDetailType } from "../../type";
import { Recipe } from "@/services/type";
import { foodDetail } from "@/libs/constants/sampleData";

const FoodDetail = ({ recipeId }: { recipeId: Recipe["id"] }) => {
  const sampleData = foodDetail;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={"Quay lại"}
              color={"dark"}
              className="text-sm font-bold font-manrope"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>Chi tiết</IonTitle>

          <IonButtons slot="end">
            <MoreOptionsBorder />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-horizontal">
        <div className="w-full flex flex-col gap-2">
          {/*  */}
          <div className="w-full"></div>
        </div>
      </IonContent>
    </>
  );
};

export default FoodDetail;
