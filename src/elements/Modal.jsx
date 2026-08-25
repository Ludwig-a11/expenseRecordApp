import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

let bodyScrollLockCount = 0;

const lockBodyScroll = () => {
  bodyScrollLockCount += 1;
  document.body.style.overflow = "hidden";
};

const unlockBodyScroll = () => {
  bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
  if (bodyScrollLockCount === 0) document.body.style.overflow = "";
};

const Modal = ({ isOpen, onClose, labelledBy, children }) => {
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    lockBodyScroll();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlockBodyScroll();
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.grabber} aria-hidden="true" />
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4L13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z" />
          </svg>
        </button>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  labelledBy: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
