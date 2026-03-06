import { useNavigate } from "react-router-dom";
import ArrowIcon from "./../images/flecha.svg";
import styles from "./BackButton.module.css";
import PropTypes from 'prop-types';

const BackButton = ({route = "/"}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);;
  };

  return (
    <button className={styles.btn} onClick={handleClick}>
      <img className={styles.icon} src={ArrowIcon} alt="Back" />
    </button>
  );
};

BackButton.propTypes = {
  route:PropTypes.string,
};

export default BackButton;
