import { useState } from "react";
import useExpensesGroupedByPeriod from "./../../hooks/useExpensesGroupedByPeriod";
import CompactPeriodGroup from "./CompactPeriodGroup";
import styles from "./CompactView.module.css";

const UNIT_OPTIONS = [
  { value: "day", label: "Por día" },
  { value: "week", label: "Por semana" },
  { value: "month", label: "Por mes" },
];

const NONE = "__none__";

const CompactView = () => {
  const [unit, setUnit] = useState("week");
  const [openKey, setOpenKey] = useState(null);
  const groups = useExpensesGroupedByPeriod(unit, 8);

  const defaultOpenKey = groups[0]?.key ?? null;
  const effectiveOpenKey = openKey === null ? defaultOpenKey : openKey === NONE ? null : openKey;

  const handleToggle = (key) => {
    setOpenKey(effectiveOpenKey === key ? NONE : key);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.unitTabs} role="group" aria-label="Agrupar por">
        {UNIT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`${styles.unitTab} ${unit === option.value ? styles.unitTabActive : ""}`}
            onClick={() => {
              setUnit(option.value);
              setOpenKey(null);
            }}
            aria-pressed={unit === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.groups}>
        {groups.map((group) => (
          <CompactPeriodGroup
            key={group.key}
            group={group}
            isOpen={effectiveOpenKey === group.key}
            onToggle={() => handleToggle(group.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default CompactView;
