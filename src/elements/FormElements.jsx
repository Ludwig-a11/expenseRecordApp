import PropTypes from "prop-types";
import styles from "./FormElements.module.css";

const FilterContainer = ({ children }) => <div className={styles.filterContainer}>{children}</div>;
const Form = ({ children, ...props }) => (
  <form className={styles.form} {...props}>
    {children}
  </form>
);
const Input = (props) => <input className={styles.input} {...props} />;
const BigInput = (props) => <input className={`${styles.input} ${styles.bigInput}`} {...props} />;
const ButtonContainer = ({ children }) => <div className={styles.buttonContainer}>{children}</div>;

const childrenShape = PropTypes.node.isRequired;

FilterContainer.propTypes = { children: childrenShape };
Form.propTypes = { children: childrenShape };
ButtonContainer.propTypes = { children: childrenShape };

export { FilterContainer, Form, Input, BigInput, ButtonContainer };
