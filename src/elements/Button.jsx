import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({ as, to, primario, conIcono, iconoGrande, children, className = "", ...props }) => {
  const classes = [
    styles.button,
    primario ? styles.primary : "",
    conIcono ? styles.withIcon : "",
    iconoGrande ? styles.largeIcon : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (as === "button") {
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  }

  return (
    <Link className={classes} to={to} {...props}>
      {children}
    </Link>
  );
};

Button.propTypes = {
  as: PropTypes.string,
  to: PropTypes.string,
  primario: PropTypes.bool,
  conIcono: PropTypes.bool,
  iconoGrande: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
