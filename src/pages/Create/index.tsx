import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonItemDivider,
  IonItem,
  IonInput,
  IonContent,
  IonButton,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { createQuiz } from "../../actions/quiz";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  history: any;
}

const Create: React.FunctionComponent<Props> = ({ history }) => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const { quiz, error, loading } = useSelector((state: any) => state.quiz);

  const createNewQuiz = () => {
    dispatch(createQuiz({ title, code }));
  };

  useEffect(() => {
    history.push("/main");
  }, [quiz]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    setShowToast(true);
  }, [error]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nueva Encuesta</IonTitle>
        </IonToolbar>
      </IonHeader>
      {isLoading ? (
        <IonLoading isOpen={true} />
      ) : (
        <IonContent>
          <IonItemDivider>Título</IonItemDivider>
          <IonItem>
            <IonInput
              value={title}
              onIonChange={(e: any) => setTitle(e.target.value)}
              clearInput
            />
          </IonItem>
          <IonItemDivider>Código</IonItemDivider>
          <IonItem>
            <IonInput
              type="password"
              value={code}
              onIonChange={(e: any) => setCode(e.target.value)}
              clearInput
            />
          </IonItem>
          <IonButton onClick={() => createNewQuiz()} expand="full">
            Crear
          </IonButton>
        </IonContent>
      )}

      {error && (
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={error.message}
          duration={1000}
          color="danger"
        />
      )}
    </IonPage>
  );
};

export default Create;
