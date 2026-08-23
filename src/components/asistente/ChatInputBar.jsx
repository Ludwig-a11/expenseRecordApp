import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ChatInputBar.module.css";

const MicIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2Z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M3 20V4l19 8-19 8Zm2-3 11.85-5L5 7v3.5L11 12l-6 1.5V17Z" />
  </svg>
);

const ChatInputBar = ({ onSend }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form className={styles.bar} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Pregunta o registra un gasto..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Escribe tu mensaje"
      />

      <button type="button" className={styles.micButton} aria-disabled="true" title="Disponible próximamente">
        <MicIcon />
      </button>

      <button type="submit" className={styles.sendButton} aria-label="Enviar" disabled={!value.trim()}>
        <SendIcon />
      </button>
    </form>
  );
};

ChatInputBar.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default ChatInputBar;
