import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../firebase/firebase.config";
import Alert from "./../elements/Alert";
import ThemeToggle from "./ThemeToggle";
import GoogleSignInButton from "./GoogleSignInButton";
import styles from "./LogIn.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertState(false);
    setAlert({});

    const regExp = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!regExp.test(email)) {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Ingresa un correo electrónico válido",
      });
      return;
    }

    if (email === "" || password === "") {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Todos los campos son obligatorios",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setAlertState(true);

      let message;
      switch (error.code) {
        case "auth/wrong-password":
          message = "La contraseña es incorrecta";
          break;
        case "auth/user-not-found":
          message = "El usuario no existe";
          break;
        default:
          message = "Ocurrió un error";
          break;
      }
      setAlert({ type: "error", message });
    }
  };

  const handleForgotPassword = async () => {
    setAlertState(false);
    setAlert({});

    const regExp = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!regExp.test(email)) {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Ingresa tu correo arriba primero y luego haz clic en '¿Olvidaste tu contraseña?'",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setAlertState(true);
      setAlert({
        type: "success",
        message: "Correo de recuperación enviado. Revisa tu bandeja de entrada — si no lo ves en unos minutos, revisa también la carpeta de spam.",
      });
    } catch {
      setAlertState(true);
      setAlert({ type: "error", message: "No se pudo enviar el correo de recuperación. Intenta de nuevo más tarde." });
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>

      <section className={styles.loginPage}>
        <div className={styles.card}>
          <aside className={styles.heroPanel}>
            <h1 className={styles.heroTitle}>¡Bienvenido de vuelta!</h1>
            <p className={styles.heroText}>Registra tus gastos más rápido y mantén tus metas mensuales bajo control.</p>
          </aside>

          <div className={styles.formPanel}>
            <div className={styles.headerRow}>
              <h2 className={styles.title}>Iniciar Sesión</h2>
              <div className={styles.headerActions}>
                <ThemeToggle />
                <Link to="/user-registration" className={styles.registerLink}>
                  Crear cuenta
                </Link>
              </div>
            </div>

            <p className={styles.subtitle}>Bienvenido de nuevo, te extrañábamos.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.fieldLabel} htmlFor="login-email">
                Correo electrónico
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={handleChange}
                className={styles.input}
                autoComplete="email"
              />

              <label className={styles.fieldLabel} htmlFor="login-password">
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={handleChange}
                className={styles.input}
                autoComplete="current-password"
              />

              <button type="submit" className={styles.submitButton}>
                Iniciar Sesión
              </button>

              <button
                type="button"
                className={styles.forgotPasswordLink}
                onClick={handleForgotPassword}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </form>

            <div className={styles.divider}>o</div>

            <GoogleSignInButton label="Continuar con Google" />
          </div>
        </div>
      </section>

      <Alert type={alert.type} message={alert.message} alertState={alertState} setAlertState={setAlertState} />
    </>
  );
};

export default Login;
