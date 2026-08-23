import { Helmet } from "react-helmet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { useBudget } from "./../context/BudgetContext";
import { useAddExpenseModal } from "./../context/AddExpenseModalContext";
import useCategoryMonthComparison from "./../hooks/useCategoryMonthComparison";
import getTodayInsight from "./../functions/getTodayInsight";
import InsightCard from "./InsightCard";
import ChatMessage from "./asistente/ChatMessage";
import ChatInputBar from "./asistente/ChatInputBar";
import ContextCard from "./asistente/ContextCard";
import { INITIAL_MESSAGES, PREVIEW_REPLY } from "./asistente/mockConversation";
import styles from "./Asistente.module.css";

let messageIdCounter = 0;
const nextMessageId = () => {
  messageIdCounter += 1;
  return `local-${messageIdCounter}`;
};

const Asistente = () => {
  const navigate = useNavigate();
  const { open: openAddExpense } = useAddExpenseModal();
  const { budget, remaining, percentUsed } = useBudget();
  const categoryComparison = useCategoryMonthComparison(new Date());
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const previousMonthLabel = format(subMonths(new Date(), 1), "MMMM", { locale: es });
  const topCategories = [...categoryComparison].filter((item) => item.amount > 0).slice(0, 3);

  const insightText = getTodayInsight({
    categoryComparison,
    previousMonthLabel,
    budget: budget ? { amount: budget.amount, remaining, percentUsed } : null,
  });

  const appendExchange = (userText) => {
    setMessages((current) => [
      ...current,
      { id: nextMessageId(), role: "user", text: userText },
      { id: nextMessageId(), role: "assistant", text: PREVIEW_REPLY },
    ]);
  };

  const handleQuickReply = (action) => {
    if (action === "register-dinner") {
      openAddExpense({ description: "Cena", amount: 60, category: "Food", date: new Date() });
      return;
    }
    if (action === "view-plan") {
      navigate("/budget");
    }
  };

  return (
    <>
      <Helmet>
        <title>Asistente</title>
      </Helmet>

      <main className={styles.page}>
        <div className={styles.chatColumn}>
          <header className={styles.header}>
            <h1 className={styles.title}>Asistente financiero</h1>
            <p className={styles.subtitle}>conoce tus gastos y presupuesto</p>
          </header>

          <InsightCard text={insightText} linkTo="/expenses-by-category" linkLabel="Ver categorías" />

          <div className={styles.thread}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} onQuickReply={handleQuickReply} />
            ))}
          </div>

          <ChatInputBar onSend={appendExchange} />
        </div>

        <aside className={styles.sideColumn}>
          <ContextCard
            remaining={remaining}
            percentUsed={percentUsed}
            topCategories={topCategories}
            onSuggestionClick={appendExchange}
          />
        </aside>
      </main>
    </>
  );
};

export default Asistente;
