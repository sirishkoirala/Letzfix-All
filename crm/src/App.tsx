import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
      () => localStorage.getItem("isAuthenticated") === "true"
   );

   const login = () => {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
   };

   const logout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
   };

   useEffect(() => {
      const storedAuthState = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(storedAuthState);
   }, []);

   return (
      <Router>
         <Routes>
            <Route path="/login" element={<LoginPage login={login} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
               path="/*"
               element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                     <Dashboard logout={logout} />
                  </PrivateRoute>
               }
            />
         </Routes>
      </Router>
   );
};

export default App;
