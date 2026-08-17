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
        message: "Please enter a valid email address",
      });
      return;
    }

    if (email === "" || password === "" || password2 === "") {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "All field are required",
      });
      return;
    }

    if (password !== password2) {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Passwords don't match",
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
          message = "The password is too weak";
          break;
        case "auth/email-already-in-use":
          message = "Email is already in use";
          break;
        case "auth/invalid-email":
          message = "Email is not valid";
          break;
        default:
          message = "An error occurred";
          break;
      }
      setAlert({ type: "error", message });
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account</title>
      </Helmet>

      <section className={styles.signupPage}>
        <div className={styles.card}>
          <div className={styles.formPanel}>
            <div className={styles.headerRow}>
              <h1 className={styles.title}>Create Account</h1>
              <div className={styles.headerActions}>
                <ThemeToggle />
                <Link to="/log-in" className={styles.loginLink}>
                  Log In
                </Link>
              </div>
            </div>

            <p className={styles.subtitle}>Create your account and start tracking your spending.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.fieldLabel} htmlFor="register-email">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                name="email"
                placeholder="you@email.com"
                value={email}
                onChange={handleChange}
                className={styles.input}
                autoComplete="email"
              />

              <label className={styles.fieldLabel} htmlFor="register-password">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                name="password"
                placeholder="Choose a secure password"
                value={password}
                onChange={handleChange}
                className={styles.input}
                autoComplete="new-password"
              />

              <label className={styles.fieldLabel} htmlFor="register-password2">
                Confirm Password
              </label>
              <input
                id="register-password2"
                type="password"
                name="password2"
                placeholder="Repeat your password"
                value={password2}
                onChange={handleChange}
                className={styles.input}
                autoComplete="new-password"
              />

              <button type="submit" className={styles.submitButton}>
                Create Account
              </button>
            </form>

            <div className={styles.divider}>or</div>

            <GoogleSignInButton label="Sign up with Google" />
          </div>

          <aside className={styles.heroPanel}>
            <h2 className={styles.heroTitle}>Ready To Start?</h2>
            <p className={styles.heroText}>Set up your profile once and keep your expense records organized every month.</p>
          </aside>
        </div>
      </section>

      <Alert type={alert.type} message={alert.message} alertState={alertState} setAlertState={setAlertState} />
    </>
  );
};

export default UserRegistration;
