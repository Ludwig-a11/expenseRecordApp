import { useAuth } from "./../context/AuthContext";
import styles from "./UserBadge.module.css";

const getInitials = (displayName, email) => {
  if (displayName) {
    const parts = displayName.trim().split(/\s+/).slice(0, 2);
    const initials = parts.map((part) => part[0]).join("");
    if (initials) return initials.toUpperCase();
  }

  if (email) {
    return email[0].toUpperCase();
  }

  return "?";
};

const UserBadge = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const label = user.displayName || user.email || "Signed in";

  return (
    <div className={styles.badge} title={user.email || undefined}>
      {user.photoURL ? (
        <img className={styles.avatar} src={user.photoURL} alt="" referrerPolicy="no-referrer" />
      ) : (
        <span className={styles.avatarFallback} aria-hidden="true">
          {getInitials(user.displayName, user.email)}
        </span>
      )}
      <span className={styles.name}>{label}</span>
    </div>
  );
};

export default UserBadge;
