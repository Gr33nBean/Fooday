import { IonContent, IonPage } from "@ionic/react";

const SplashScreen = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          className="w-full min-h-[100svh] flex items-center justify-center ion-padding bg-blue bg-opacity-20 flex-col transition duration-300 ease-in-out"
          style={style}
        >
          <div className="size-[120px]">
            <img
              src="image/logo.png"
              alt="logo"
              className="size-full object-cover"
            />
          </div>
          <p className="text-xl pt-2 font-extrabold text-blue">Company</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;
