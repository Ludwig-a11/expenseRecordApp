import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Container from "./elements/Container.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn.jsx";
import UserRegistration from "./components/UserRegistration.jsx";
import ExpensesByCategory from "./components/ExpensesByCategory.jsx";
import ListOfExpenses from "./components/ListOfExpenses.jsx";
import EditExpense from "./components/EditExpense.jsx";
import { Helmet } from "react-helmet";
import favicon from "./images/logo.png";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <Router>
          <Container>
            <Routes>
              <Route path="/log-in" element={<LogIn />} />
              <Route path="/user-registration" element={<UserRegistration />} />
              <Route path="/expenses-by-category" element={<ExpensesByCategory />} />
              <Route path="/list-of-expenses" element={<ListOfExpenses />} />
              <Route path="/edit-expense/:id" element={<EditExpense />} />
              <Route path="/" element={<App />} />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </>
  </StrictMode>
);
