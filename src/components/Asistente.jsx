import { Helmet } from "react-helmet";
import styles from "./Asistente.module.css";

const Asistente = () => (
  <>
    <Helmet>
      <title>Asistente</title>
    </Helmet>

    <main className={styles.page}>
      <h1 className={styles.title}>Asistente financiero</h1>
      <p className={styles.subtitle}>conoce tus gastos y presupuesto</p>
    </main>
  </>
);

export default Asistente;
