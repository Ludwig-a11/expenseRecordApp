import PropsTypes from "prop-types";
import styles from "./Alert.module.css";
import { useEffect } from "react";

const Alert = ({ type, message, alertState, setAlertState }) => {
  useEffect(() => {
    let time;

    if (alertState === true) {
      time = setTimeout(() => {
        setAlertState(false);
      }, 4000);
    }

    return () => clearTimeout(time);
  }, [alertState, setAlertState]);

  return (
    <>
      {alertState && (
        <div className={styles.alertContainer}>
          <p className={`${styles.message} ${styles[type] || ""}`}>{message}</p>
        </div>
      )}
    </>
  );
};

Alert.propTypes = {
  type: PropsTypes.string,
  message: PropsTypes.string,
  alertState: PropsTypes.bool.isRequired,
  setAlertState: PropsTypes.func.isRequired,
};

export default Alert;
