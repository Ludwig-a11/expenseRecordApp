import { Helmet } from "react-helmet";
import styles from "./Asistente.module.css";

const Asistente = () => {
  return (
    <>
      <Helmet>
        <title>Asistente</title>
      </Helmet>

      <main className={styles.page}>
        <div className={styles.card}>
          <div className={styles.bubble} aria-hidden="true">
            <span className={styles.emoji}>🤖</span>
            <span className={styles.dots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </span>
          </div>

          <h1 className={styles.title}>Asistente financiero</h1>
          <p className={styles.text}>
            Estamos preparando a tu asistente para que te ayude a entender
            tus gastos y tu presupuesto.
          </p>
          <p className={styles.badge}>Muy pronto</p>
        </div>
      </main>
    </>
  );
};

export default Asistente;
