import { HomeIcon, ListIcon, PieChartIcon, SparkleIcon, WalletIcon } from "./NavIcons";

const NAV_ITEMS = [
  { to: "/", label: "Inicio", Icon: HomeIcon, end: true },
  { to: "/list-of-expenses", label: "Movimientos", Icon: ListIcon },
  { to: "/expenses-by-category", label: "Categorías", Icon: PieChartIcon },
  { to: "/asistente", label: "Asistente", Icon: SparkleIcon },
  { to: "/budget", label: "Presupuesto", Icon: WalletIcon },
];

const TAB_BAR_ITEMS = [
  { to: "/", label: "Inicio", Icon: HomeIcon, end: true },
  { to: "/list-of-expenses", label: "Movimientos", Icon: ListIcon },
  { to: "/expenses-by-category", label: "Categorías", Icon: PieChartIcon },
  { to: "/asistente", label: "Asistente", Icon: SparkleIcon },
];

export { NAV_ITEMS, TAB_BAR_ITEMS };
