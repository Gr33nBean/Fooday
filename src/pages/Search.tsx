import { IonContent, IonPage } from "@ionic/react";
import SearchContent from "../components/UI/SearchPage";

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <SearchContent />
      </IonContent>
    </IonPage>
  );
};

export default Search;
