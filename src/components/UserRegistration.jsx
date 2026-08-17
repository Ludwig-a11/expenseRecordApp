import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Alert from "./../elements/Alert";
import ThemeToggle from "./ThemeToggle";
import GoogleSignInButton from "./GoogleSignInButton";
import styles from "./UserRegistration.module.css";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertState(false);
    setAlert({});

    const regExp = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (regExp.test(email) === false) {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Ingresa un correo electrónico válido",
      });
      return;
    }

    if (email === "" || password === "" || password2 === "") {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Todos los campos son obligatorios",
      });
      return;
    }

    if (password !== password2) {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setAlertState(true);
      let message;
      switch (error.code) {
        case "auth/weak-password":
          message = "La contraseña es demasiado débil";
          break;
        case "auth/email-already-in-use":
          message = "El correo ya está en uso";
          break;
        case "auth/invalid-email":
          message = "El correo no es válido";
          break;
        default:
          message = "Ocurrió un error";
          break;
      }
      setAlert({ type: "error", message });
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>

      <section className={styles.signupPage}>
        <div className={styles.card}>
          <div className={styles.formPanel}>
            <div className={styles.headerRow}>
              <h1 className={styles.title}>Crear Cuenta</h1>
              <div className={styles.headerActions}>
                <ThemeToggle />
                <Link to="/log-in" className={styles.loginLink}>
                  Iniciar Sesión
                </Link>
              </div>
            </div>

            <p className={styles.subtitle}>Crea tu cuenta y empieza a registrar tus gastos.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.fieldLabel} htmlFor="register-email">
                Correo electrónico
              </label>
              <input
                id="register-email"
                type="email"
                name="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={handleChange}
                className={styles.input}
                autoComplete="email"
              />

              <label className={styles.fieldLabel} htmlFor="register-password">
                Contraseña
              </label>
              <input
                id="register-password"
                type="password"
                name="password"
                placeholder="Elige una contraseña segura"
                value={password}
                onChange={handleChange}
                className={styles.input}
                autoComplete="new-password"
              />

              <label className={styles.fieldLabel} htmlFor="register-password2">
                Confirmar Contraseña
              </label>
              <input
                id="register-password2"
                type="password"
                name="password2"
                placeholder="Repite tu contraseña"
                value={password2}
                onChange={handleChange}
                className={styles.input}
                autoComplete="new-password"
              />

              <button type="submit" className={styles.submitButton}>
                Crear Cuenta
              </button>
            </form>

            <div className={styles.divider}>o</div>

            <GoogleSignInButton label="Registrarte con Google" />
          </div>

          <aside className={styles.heroPanel}>
            <h2 className={styles.heroTitle}>¿Listo para empezar?</h2>
            <p className={styles.heroText}>Configura tu perfil una vez y mantén tus gastos organizados cada mes.</p>
          </aside>
        </div>
      </section>

      <Alert type={alert.type} message={alert.message} alertState={alertState} setAlertState={setAlertState} />
    </>
  );
};

export default UserRegistration;
