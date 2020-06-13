import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonTitle,
  IonButton,
  IonHeader,
  IonToolbar,
  IonList,
  IonItem,
  IonModal,
  IonInput,
} from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Quiz } from "../../types/Quiz";
import { fetchQuizes, setSelectedQuiz } from "../../actions/quiz";
import { valorations } from "../../constants/valorations";

interface Props {
  history: any;
}

const Main: React.FunctionComponent<Props> = ({ history }) => {
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState<Quiz>();
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { quizes, loading, error } = useSelector((state: any) => state.quiz);

  const renderItems = () => {
    if (quizes && quizes.length) {
      return quizes.map((item: Quiz, i: number) => {
        return (
          <IonItem key={i} onClick={() => openModal(item)}>
            {item.title}
          </IonItem>
        );
      });
    }
  };

  const openModal = (item: Quiz) => {
    setCurrent(item);
    setModal(true);
  };

  const validateCode = () => {
    if (current?.code === code) {
      setModal(false);
      dispatch(setSelectedQuiz(current));
      history.push("/quiz");
    }
  };

  useEffect(() => {
    if (!user || !user.email) {
      history.push("/home");
    }
  }, [user]);

  useEffect(() => {
    if (!quizes || !quizes.length) {
      dispatch(fetchQuizes());
    }
  }, []);

  return (
    <IonPage className="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="main__content">
        {user && (
          <IonTitle className="main__content-title">
            Hola {user.displayName}!
          </IonTitle>
        )}

        <IonList className="main__content-list">{renderItems()}</IonList>
        <div className="main__content-actions">
          <IonButton expand="full" onClick={() => history.push("/create")}>
            Crear Encuesta
          </IonButton>
        </div>
      </IonContent>

      <IonModal isOpen={modal} onDidDismiss={() => setModal(false)}>
        <IonItem>
          <IonInput
            placeholder="Code"
            onIonChange={(e: any) => setCode(e.target.value)}
            clearInput
          />
        </IonItem>
        <div className="modal">
          <IonButton expand="full" onClick={() => validateCode()}>
            Validar Código
          </IonButton>
          <IonButton
            expand="full"
            onClick={() => setModal(false)}
            color="danger"
          >
            Cerrar
          </IonButton>
        </div>
      </IonModal>
    </IonPage>
  );
};

export default Main;
