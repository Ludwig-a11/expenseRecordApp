import { useNavigate } from "react-router-dom";
import ArrowIcon from "./../images/flecha.svg";
import styles from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <button className={styles.btn} onClick={handleClick}>
      <img className={styles.icon} src={ArrowIcon} alt="Back" />
    </button>
  );
};

export default BackButton;
