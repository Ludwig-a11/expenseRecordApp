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
import { getMissingFirebaseEnv } from "./config/firebaseEnv.js";
import ConfigErrorScreen from "./components/ConfigErrorScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

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
        <AuthProvider>
          <Router>
            <Container>
              <Routes>
                <Route path="/log-in" element={<LogIn />} />
                <Route path="/user-registration" element={<UserRegistration />} />
                
                <Route path="/expenses-by-category" element={
                <PrivateRoute>
                  <ExpensesByCategory />
                </PrivateRoute>
                } />

                <Route path="/list-of-expenses" element={
                  <PrivateRoute>
                    <ListOfExpenses />
                  </PrivateRoute>
                } />

                <Route path="/edit-expense/:id" element={
                  <PrivateRoute>
                    <EditExpense />
                  </PrivateRoute>
                } />

                <Route path="/" element={
                  <PrivateRoute>
                    <App />
                  </PrivateRoute>
                } />
              </Routes>
            </Container>
          </Router>
        </AuthProvider>
      </>
    )}
  </StrictMode>
);
