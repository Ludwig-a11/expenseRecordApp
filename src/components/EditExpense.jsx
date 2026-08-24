import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import useGetExpense from "../hooks/useGetExpense";
import styles from "./EditExpense.module.css";

const EditExpense = () => {
  const { id } = useParams();
  const [expense] = useGetExpense(id);

  return (
    <>
      <Helmet>
        <title>Editar Gasto</title>
      </Helmet>

      <main className={styles.page}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Editar Gasto</h1>
          <p className={styles.subtitle}>Actualiza detalles, categoría, monto o fecha manteniendo tu total mensual exacto.</p>
        </div>

        <section className={styles.contentGrid}>
          <div className={styles.formShell}>
            <ExpenseForm expense={expense} />
          </div>

          <aside className={styles.sidePanel}>
            <article className={styles.panelCard}>
              <h2 className={styles.panelTitle}>Resumen de Edición</h2>
              <p className={styles.panelText}>Ajusta solo lo que cambió para mantener tu historial limpio y fácil de revisar después.</p>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>Verifica la categoría y el monto antes de guardar.</div>
                <div className={styles.statItem}>Corrige la fecha si el cargo se registró después.</div>
                <div className={styles.statItem}>Usa descripciones claras para identificar cambios rápido.</div>
              </div>
            </article>

            <article className={styles.tipsCard}>
              <h2 className={styles.panelTitle}>Flujo de Edición</h2>
              <ul className={styles.tipList}>
                <li>Revisa los detalles originales del registro antes de cambiar valores.</li>
                <li>Actualiza monto y fecha juntos al corregir errores de registro.</li>
                <li>Guarda los cambios y confirma que la barra de total refleje la actualización.</li>
              </ul>
            </article>
          </aside>
        </section>
      </main>
    </>
  );
};

export default EditExpense;
