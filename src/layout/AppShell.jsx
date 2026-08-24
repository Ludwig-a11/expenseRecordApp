import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomTabBar from "./BottomTabBar";
import MobileTopBar from "./MobileTopBar";
import AddExpenseOverlay from "./../components/AddExpenseOverlay";
import styles from "./AppShell.module.css";

const AppShell = () => (
  <div className={styles.shellRoot}>
    <Sidebar />
    <MobileTopBar />

    <div className={styles.shellMain}>
      <Outlet />
    </div>

    <BottomTabBar />
    <AddExpenseOverlay />
  </div>
);

export default AppShell;
