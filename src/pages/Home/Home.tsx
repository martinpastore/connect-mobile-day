import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import Login from "../../components/Login";

interface Props {
  history: any;
}

const Home: React.FC<Props> = ({ history }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Login history={history} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
