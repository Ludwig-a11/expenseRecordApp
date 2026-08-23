import PropTypes from "prop-types";
import QuickReplyChip from "./QuickReplyChip";
import styles from "./ChatMessage.module.css";

const ChatMessage = ({ message, onQuickReply }) => {
  const isUser = message.role === "user";

  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : ""}`}>
      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}>
        {message.text}
      </div>

      {message.quickReplies && (
        <div className={styles.quickReplies}>
          {message.quickReplies.map((reply) => (
            <QuickReplyChip key={reply.action} label={reply.label} onClick={() => onQuickReply(reply.action)} />
          ))}
        </div>
      )}
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.oneOf(["user", "assistant"]).isRequired,
    text: PropTypes.string.isRequired,
    quickReplies: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string.isRequired, action: PropTypes.string.isRequired })
    ),
  }).isRequired,
  onQuickReply: PropTypes.func.isRequired,
};

export default ChatMessage;
