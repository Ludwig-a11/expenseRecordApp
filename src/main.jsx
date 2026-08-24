import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Container from "./elements/Container.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn.jsx";
import UserRegistration from "./components/UserRegistration.jsx";
import ExpensesByCategory from "./components/ExpensesByCategory.jsx";
import ListOfExpenses from "./components/ListOfExpenses.jsx";
import EditExpense from "./components/EditExpense.jsx";
import Budget from "./components/Budget.jsx";
import Inicio from "./components/Inicio.jsx";
import Asistente from "./components/Asistente.jsx";
import { Helmet } from "react-helmet";
import favicon from "./images/logo.png";
import { AuthProvider } from "./context/AuthContext.jsx";
import { getMissingFirebaseEnv } from "./config/firebaseEnv.js";
import ConfigErrorScreen from "./components/ConfigErrorScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { BudgetProvider } from "./context/BudgetContext.jsx";
import { ThemeProvider, THEME_STORAGE_KEY } from "./context/ThemeContext.jsx";
import { AddExpenseModalProvider } from "./context/AddExpenseModalContext.jsx";
import AppShell from "./layout/AppShell.jsx";

const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "light";
document.body.classList.add(`theme-${initialTheme}`);
document.body.style.colorScheme = initialTheme;

const missingFirebaseEnv = getMissingFirebaseEnv(import.meta.env);
const hasFirebaseConfigError = missingFirebaseEnv.length > 0;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {hasFirebaseConfigError ? (
      <ConfigErrorScreen missingFirebaseEnv={missingFirebaseEnv} />
    ) : (
      <>
        <Helmet>
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
        </Helmet>

        <ThemeProvider>
          <ErrorBoundary>
            <AuthProvider>
              <BudgetProvider>
                <AddExpenseModalProvider>
                  <Router>
                    <Container>
                      <Routes>
                        <Route path="/log-in" element={<LogIn />} />
                        <Route path="/user-registration" element={<UserRegistration />} />

                        <Route
                          element={
                            <PrivateRoute>
                              <AppShell />
                            </PrivateRoute>
                          }
                        >
                          <Route path="/" element={<Inicio />} />
                          <Route path="/list-of-expenses" element={<ListOfExpenses />} />
                          <Route path="/expenses-by-category" element={<ExpensesByCategory />} />
                          <Route path="/budget" element={<Budget />} />
                          <Route path="/asistente" element={<Asistente />} />
                          <Route path="/edit-expense/:id" element={<EditExpense />} />
                        </Route>
                      </Routes>
                    </Container>
                  </Router>
                </AddExpenseModalProvider>
              </BudgetProvider>
            </AuthProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </>
    )}
  </StrictMode>
);
