import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonLoading,
  IonToast,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { updateQuizes } from "../../actions/quiz";

interface Props {
  history: any;
}

const Quiz: React.FunctionComponent<Props> = ({ history }) => {
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { quiz, loading, error } = useSelector((state: any) => state.quiz);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const canValidate = () => {
    if (quiz && quiz.valorations) {
      return (
        quiz.valorations.filter(
          (valoration: any) => valoration.email === user.email
        ).length === 0
      );
    }
    return true;
  };

  const valorate = (value: number) => {
    if (!canValidate()) return null;

    if (quiz && quiz.valorations) {
      quiz.valorations.push({
        email: user.email,
        valoration: value,
      });
    } else {
      quiz.valorations = [
        {
          email: user.email,
          valoration: value,
        },
      ];
    }

    dispatch(
      updateQuizes({
        id: quiz.id,
        valorations: quiz.valorations,
      })
    );
    history.push("/main");
  };

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
          <IonTitle>{quiz?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {isLoading ? (
        <IonLoading isOpen={true} />
      ) : (
        <IonContent className="selections">
          <IonTitle className="title">Qué te parecio?</IonTitle>
          <IonItem onClick={() => valorate(5)}>
            <IonTitle className="selection">😃</IonTitle>
            <IonLabel>Me encantó</IonLabel>
          </IonItem>
          <IonItem onClick={() => valorate(4)}>
            <IonTitle className="selection">🙂</IonTitle>
            <IonLabel>Estuvo bueno</IonLabel>
          </IonItem>
          <IonItem onClick={() => valorate(3)}>
            <IonTitle className="selection">😐</IonTitle>
            <IonLabel>Meh</IonLabel>
          </IonItem>
          <IonItem onClick={() => valorate(2)}>
            <IonTitle className="selection">🙁</IonTitle>
            <IonLabel>Mas o menos</IonLabel>
          </IonItem>
          <IonItem onClick={() => valorate(1)}>
            <IonTitle className="selection">😫</IonTitle>
            <IonLabel>Malazo</IonLabel>
          </IonItem>
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

export default Quiz;
