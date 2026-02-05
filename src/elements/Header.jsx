import PropTypes from "prop-types";
import styles from "./Header.module.css";

const Header = ({ children }) => <div className={styles.header}>{children}</div>;
const Title = ({ children }) => <h1 className={styles.title}>{children}</h1>;
const HeaderContainer = ({ children }) => <div className={styles.headerContainer}>{children}</div>;
const ButtonsContainer = ({ children }) => <div className={styles.buttonsContainer}>{children}</div>;

const childrenShape = PropTypes.node.isRequired;

Header.propTypes = { children: childrenShape };
Title.propTypes = { children: childrenShape };
HeaderContainer.propTypes = { children: childrenShape };
ButtonsContainer.propTypes = { children: childrenShape };

export { Header, Title, HeaderContainer, ButtonsContainer };
