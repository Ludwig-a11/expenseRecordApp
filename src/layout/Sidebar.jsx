import { NavLink } from "react-router-dom";
import logo from "./../images/logo.png";
import UserBadge from "./../elements/UserBadge";
import ThemeToggle from "./../components/ThemeToggle";
import LogOutButton from "./../components/LogOutButton";
import { useAddExpenseModal } from "./../context/AddExpenseModalContext";
import { NAV_ITEMS } from "./navItems";
import { PlusIcon } from "./NavIcons";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { open } = useAddExpenseModal();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <img src={logo} alt="" className={styles.brandLogo} />
        <span className={styles.brandName}>Expense Record</span>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
          >
            <span className={styles.navIcon} aria-hidden="true"><Icon /></span>
            {label}
          </NavLink>
        ))}
      </nav>

      <button type="button" className={styles.addButton} onClick={() => open()}>
        <span className={styles.navIcon} aria-hidden="true"><PlusIcon /></span>
        Agregar gasto
      </button>

      <div className={styles.footer}>
        <UserBadge />
        <div className={styles.footerActions}>
          <ThemeToggle />
          <LogOutButton className={styles.logoutButton} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
