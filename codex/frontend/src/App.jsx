import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@context/AuthContext";
import ProtectedRoute from "@pages/ProtectedRoute";
import Home from "@pages/Home/Home"
import Login from "@pages/Authentication/Login"
import PythonHome from "@pages/Languages/Python/PythonHome"
import PyIfElse from "@pages/Languages/Python/topics/PyIfElse";
import PyLoops from "@pages/Languages/Python/topics/PyLoops";
import PyArrays from "@pages/Languages/Python/topics/PyArrays";
import PyFunctions from "@pages/Languages/Python/topics/PyFunctions";
import PyExercise from "@/pages/Languages/Python/topics/PyExercise";
import Profile from "@/pages/Profile/Profile";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        <Route
          path="/python"
          element={
            <ProtectedRoute>
              <PythonHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pyIfElse"
          element={
            <ProtectedRoute>
              <PyIfElse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pyLoops"
          element={
            <ProtectedRoute>
              <PyLoops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pyArrays"
          element={
            <ProtectedRoute>
              <PyArrays />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pyFunctions"
          element={
            <ProtectedRoute>
              <PyFunctions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pyExercise"
          element={
            <ProtectedRoute>
              <PyExercise />
            </ProtectedRoute>
          }
        />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}