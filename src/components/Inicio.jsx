import { Helmet } from "react-helmet";
import { useAuth } from "./../context/AuthContext";
import BudgetSummaryBar from "./BudgetSummaryBar";
import styles from "./Inicio.module.css";

const Inicio = () => {
  const { user } = useAuth();
  const firstName = (user?.displayName || "").trim().split(/\s+/)[0];

  return (
    <>
      <Helmet>
        <title>Inicio</title>
      </Helmet>

      <main className={styles.page}>
        <h1 className={styles.title}>{firstName ? `Hola, ${firstName}` : "Hola"}</h1>

        <div className={styles.totalWrap}>
          <BudgetSummaryBar />
        </div>
      </main>
    </>
  );
};

export default Inicio;
