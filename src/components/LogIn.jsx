import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../firebase/firebase.config";
import Alert from "./../elements/Alert";
import ThemeToggle from "./ThemeToggle";
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
        message: "Please enter a valid email address",
      });
      return;
    }

    if (email === "" || password === "") {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "All field are required",
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
          message = "The password is incorrect";
          break;
        case "auth/user-not-found":
          message = "The user does not exist";
          break;
        default:
          message = "An error occurred";
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
        message: "Enter your email above first, then click 'Forgot your password?'",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setAlertState(true);
      setAlert({
        type: "success",
        message: "Password reset email sent. Check your inbox — if you don't see it in a few minutes, check your spam/junk folder too.",
      });
    } catch {
      setAlertState(true);
      setAlert({ type: "error", message: "Could not send reset email. Try again later." });
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <section className={styles.loginPage}>
        <div className={styles.card}>
          <aside className={styles.heroPanel}>
            <h1 className={styles.heroTitle}>Welcome Back!</h1>
            <p className={styles.heroText}>Track your expenses faster and keep your monthly goals under control.</p>
          </aside>

          <div className={styles.formPanel}>
            <div className={styles.headerRow}>
              <h2 className={styles.title}>Log In</h2>
              <div className={styles.headerActions}>
                <ThemeToggle />
                <Link to="/user-registration" className={styles.registerLink}>
                  Create account
                </Link>
              </div>
            </div>

            <p className={styles.subtitle}>Welcome back, we missed you.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.fieldLabel} htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="you@email.com"
                value={email}
                onChange={handleChange}
                className={styles.input}
                autoComplete="email"
              />

              <label className={styles.fieldLabel} htmlFor="login-password">
                Password
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
                Sign In
              </button>

              <button
                type="button"
                className={styles.forgotPasswordLink}
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </button>
            </form>
          </div>
        </div>
      </section>

      <Alert type={alert.type} message={alert.message} alertState={alertState} setAlertState={setAlertState} />
    </>
  );
};

export default Login;
