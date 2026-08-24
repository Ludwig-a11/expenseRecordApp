import { NavLink } from "react-router-dom";
import { useAddExpenseModal } from "./../context/AddExpenseModalContext";
import { TAB_BAR_ITEMS } from "./navItems";
import { PlusIcon } from "./NavIcons";
import styles from "./BottomTabBar.module.css";

const BottomTabBar = () => {
  const { open } = useAddExpenseModal();
  const [firstHalf, secondHalf] = [
    TAB_BAR_ITEMS.slice(0, 2),
    TAB_BAR_ITEMS.slice(2),
  ];

  const renderTab = ({ to, label, Icon, end }) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ""}`}
    >
      <span className={styles.tabIcon} aria-hidden="true"><Icon /></span>
      {label}
    </NavLink>
  );

  return (
    <nav className={styles.tabBar} aria-label="Navegación principal">
      {firstHalf.map(renderTab)}

      <button type="button" className={styles.fab} onClick={() => open()} aria-label="Agregar gasto">
        <PlusIcon />
      </button>

      {secondHalf.map(renderTab)}
    </nav>
  );
};

export default BottomTabBar;
