import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonItemDivider,
  IonItem,
  IonInput,
  IonLoading,
  IonToast,
} from "@ionic/react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../types/User";
import { fetchUser } from "../../actions/user";
import { fetchQuizes } from "../../actions/quiz";

interface Props {
  history: any;
}

const Login: React.FunctionComponent<Props> = ({ history }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: any) => state.user);

  const login = () => {
    const user: User = {
      email: data.email,
      password: data.password,
    };

    dispatch(fetchUser(user));
    dispatch(fetchQuizes());
  };

  useEffect(() => {
    if (user && user.email) {
      history.push("/main");
    }
  }, [user]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    setShowToast(true);
  }, [error]);

  return (
    <IonContent className="content">
      {isLoading ? (
        <IonLoading isOpen={true} />
      ) : (
        <>
          <IonItemDivider>Email</IonItemDivider>
          <IonItem>
            <IonInput
              value={data.email}
              onIonChange={(e: any) =>
                setData({ ...data, email: e.target.value })
              }
              clearInput
            />
          </IonItem>
          <IonItemDivider>Contraseña</IonItemDivider>
          <IonItem>
            <IonInput
              value={data.password}
              type="password"
              onIonChange={(e: any) =>
                setData({ ...data, password: e.target.value })
              }
              clearInput
            />
          </IonItem>
          <div className="action">
            <IonButton expand="full" onClick={() => login()}>
              Iniciar Sesión
            </IonButton>
            <IonButton expand="full" href="/register">
              Registrate
            </IonButton>
          </div>
        </>
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
    </IonContent>
  );
};

export default Login;
