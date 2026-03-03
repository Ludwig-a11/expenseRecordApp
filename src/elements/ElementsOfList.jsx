import PropTypes from "prop-types";
import styles from "./ElementsOfList.module.css";

const List = ({ children, ...props }) => (
  <ul className={styles.list} {...props}>
    {children}
  </ul>
);


const ListElement = ({ children, ...props }) => (
  <li className={styles.listElement} {...props}>
    {children}
  </li>
);


const ListOfCategories = ({ children, ...props }) => (
  <ul className={styles.listOfCategories} {...props}>
    {children}
  </ul>
);


const ElementListOfCategories = ({ children, ...props }) => (
  <li className={styles.elementListOfCategories} {...props}>
    {children}
  </li>
);


const Category = ({ children }) => <div className={styles.category}>{children}</div>;
const Description = ({ children }) => <div className={styles.description}>{children}</div>;
const Value = ({ children }) => <div className={styles.value}>{children}</div>;
const DateBadge = ({ children }) => <div className={styles.date}>{children}</div>;

const ButtonsContainerOfList = ({ children }) => (
  <div className={styles.buttonsContainerOfList}>{children}</div>
);


const ActionButton = ({ children, ...props }) => (
  <button className={styles.actionButton} type="button" {...props}>
    {children}
  </button>
);


const ActionLink = ({ children, ...props }) => (
  <a className={styles.actionButton} {...props}>
    {children}
  </a>
);


const SubtitleContainer = ({ children }) => (
  <div className={styles.subtitleContainer}>{children}</div>
);

const Subtitle = ({ children }) => <h2 className={styles.subtitle}>{children}</h2>;

const CentralButtonContainer = ({ children }) => (
  <div className={styles.centralButonContainer}>{children}</div>
);

const UploadMoreButton = ({ children, ...props }) => (
  <a className={styles.uploadMoreButton} {...props}>
    {children}
  </a>
);

const childrenShape = PropTypes.node.isRequired;

List.propTypes = { children: childrenShape };
ListElement.propTypes = { children: childrenShape };
ListOfCategories.propTypes = { children: childrenShape };
ElementListOfCategories.propTypes = { children: childrenShape };

Category.propTypes = { children: childrenShape };
Description.propTypes = { children: childrenShape };
Value.propTypes = { children: childrenShape };
DateBadge.propTypes = { children: childrenShape };

ButtonsContainerOfList.propTypes = { children: childrenShape };
ActionButton.propTypes = { children: childrenShape };
ActionLink.propTypes = { children: childrenShape };

SubtitleContainer.propTypes = { children: childrenShape };
Subtitle.propTypes = { children: childrenShape };
CentralButtonContainer.propTypes = { children: childrenShape };
UploadMoreButton.propTypes = { children: childrenShape };

export {
  List,
  ListElement,
  ListOfCategories,
  ElementListOfCategories,
  Category,
  Description,
  Value,
  DateBadge,
  ButtonsContainerOfList,
  ActionButton,
  ActionLink,
  SubtitleContainer,
  Subtitle,
  CentralButtonContainer,
  UploadMoreButton,
};