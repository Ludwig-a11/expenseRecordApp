import PropTypes from "prop-types";
import styles from "./SelectCategories.module.css";

const SelectContainer = ({ children, ...props }) => (
  <div className={styles.selectContainer} {...props}>
    {children}
  </div>
);

const SelectedOption = ({ children }) => (
  <div className={styles.selectedOption}>{children}</div>
);

const Options = ({ children }) => (
  <div className={styles.options}>{children}</div>
);

const Option = ({ children, ...props }) => (
  <div className={styles.option} {...props}>
    {children}
  </div>
);

const childrenShape = PropTypes.node.isRequired;

SelectContainer.propTypes = {
  children: childrenShape,
};

SelectedOption.propTypes = {
  children: childrenShape,
};

Options.propTypes = {
  children: childrenShape,
};

Option.propTypes = {
  children: childrenShape,
};

export { SelectContainer, SelectedOption, Options, Option };
