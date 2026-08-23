import { useState } from "react";
import UserBadge from "./../elements/UserBadge";
import ThemeToggle from "./../components/ThemeToggle";
import LogOutButton from "./../components/LogOutButton";
import styles from "./MobileTopBar.module.css";

const MobileTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label="Cuenta"
      >
        <UserBadge />
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.themeRow}>
            <span>Tema</span>
            <ThemeToggle />
          </div>
          <LogOutButton className={styles.logoutButton} onClick={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default MobileTopBar;
