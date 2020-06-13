import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonInput,
  IonItem,
  IonContent,
  IonItemDivider,
  IonButton,
  IonLoading,
  IonToast,
  IonToolbar,
  IonHeader,
  IonTitle,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { createUser } from "../../actions/user";
import { User } from "../../types/User";

interface Props {
  history: any;
}

const Register: React.FunctionComponent<Props> = ({ history }) => {
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: any) => state.user);

  const createAccount = () => {
    const user: User = {
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    };

    dispatch(createUser(user));
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
    <IonPage className="register">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      {isLoading ? (
        <IonLoading isOpen={true} />
      ) : (
        <IonContent>
          <IonItemDivider>Nombre Completo</IonItemDivider>
          <IonItem>
            <IonInput
              value={data.displayName}
              onIonChange={(e: any) =>
                setData({ ...data, displayName: e.target.value })
              }
              clearInput
            />
          </IonItem>
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
            <IonButton expand="full" onClick={() => createAccount()}>
              Crear cuenta
            </IonButton>
            <IonButton
              color="light"
              expand="full"
              onClick={() => history.push("/home")}
            >
              Iniciar sesión
            </IonButton>
          </div>
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

export default Register;
