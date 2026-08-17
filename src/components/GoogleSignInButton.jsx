import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./../firebase/firebase.config";
import Alert from "./../elements/Alert";
import styles from "./GoogleSignInButton.module.css";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.icon}>
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.82-.07-1.42-.22-2.05H12v3.72h6.51c-.13 1.06-.83 2.66-2.4 3.73l-.02.15 3.48 2.63.24.02c2.22-2.02 3.5-5 3.5-8.2Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.17 0 5.83-1.03 7.77-2.8l-3.7-2.8c-.99.68-2.32 1.15-4.07 1.15-3.11 0-5.75-2.02-6.69-4.82l-.14.01-3.62 2.73-.05.13C3.4 21.3 7.4 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.31 14.73A7.35 7.35 0 0 1 4.9 12c0-.95.17-1.87.4-2.73L5.29 9.1 1.62 6.32l-.12.06A11.98 11.98 0 0 0 0 12c0 1.93.47 3.76 1.5 5.62l3.81-2.89Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c2.2 0 3.68.94 4.53 1.73l3.31-3.22C17.82 1.19 15.17 0 12 0 7.4 0 3.4 2.7 1.5 6.38l3.8 2.89C6.24 6.77 8.89 4.75 12 4.75Z"
    />
  </svg>
);

const GoogleSignInButton = ({ label = "Continuar con Google" }) => {
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const handleClick = async () => {
    setAlertState(false);
    setAlert({});

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
        return;
      }

      let message;
      switch (error.code) {
        case "auth/account-exists-with-different-credential":
          message = "Ya existe una cuenta con este correo. Inicia sesión con tu correo y contraseña en su lugar.";
          break;
        default:
          message = "Algo salió mal al iniciar sesión con Google. Intenta de nuevo más tarde.";
          break;
      }

      setAlertState(true);
      setAlert({ type: "error", message });
    }
  };

  return (
    <>
      <button type="button" className={styles.googleButton} onClick={handleClick}>
        <GoogleIcon />
        {label}
      </button>

      <Alert type={alert.type} message={alert.message} alertState={alertState} setAlertState={setAlertState} />
    </>
  );
};

GoogleSignInButton.propTypes = {
  label: PropTypes.string,
};

export default GoogleSignInButton;
