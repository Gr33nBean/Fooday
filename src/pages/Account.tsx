import ProfileInfo from "@/components/UI/Profile/ProfileInfo";
import { selectSignedUser } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";

const Account: React.FC = () => {
  const signedUser = useAppSelector(selectSignedUser);
  return (
    <IonPage>
      <IonContent fullscreen>
        <ProfileInfo data={signedUser} />
      </IonContent>
    </IonPage>
  );
};

export default Account;
