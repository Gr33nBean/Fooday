import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SearchContent from "../components/UI/Search";

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tìm kiếm</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-horizontal">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tìm kiếm</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SearchContent />
      </IonContent>
    </IonPage>
  );
};

export default Search;
