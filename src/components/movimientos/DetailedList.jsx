import PropTypes from "prop-types";
import groupExpensesByDay from "./../../functions/groupExpensesByDay";
import { formatDayBadge } from "./../../functions/formatRelativeDay";
import SwipeableExpenseRow from "./SwipeableExpenseRow";
import styles from "./DetailedList.module.css";

const DetailedList = ({ expenses, onRequestDelete }) => {
  const groups = groupExpensesByDay(expenses, formatDayBadge);

  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <div key={group.label} className={styles.group}>
          <p className={styles.dateBadge}>{group.label}</p>
          <div className={styles.rows}>
            {group.items.map((expense) => (
              <SwipeableExpenseRow key={expense.id} expense={expense} onRequestDelete={onRequestDelete} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

DetailedList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRequestDelete: PropTypes.func.isRequired,
};

export default DetailedList;
