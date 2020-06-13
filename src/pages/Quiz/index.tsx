import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonLoading,
  IonToast,
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
  };

  const valorate = (value: number) => {
    if (!canValidate()) return null;

    quiz.valorations.push({
      email: user.email,
      valoration: value,
    });

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
          <IonTitle>Qué te parecio?</IonTitle>
          <IonTitle onClick={() => valorate(5)} className="selection">
            😃
          </IonTitle>
          <IonTitle onClick={() => valorate(4)} className="selection">
            🙂
          </IonTitle>
          <IonTitle onClick={() => valorate(3)} className="selection">
            😐
          </IonTitle>
          <IonTitle onClick={() => valorate(2)} className="selection">
            🙁
          </IonTitle>
          <IonTitle onClick={() => valorate(1)} className="selection">
            😫
          </IonTitle>
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
