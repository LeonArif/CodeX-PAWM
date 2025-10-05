import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "@pages/Home/Home"
import PythonHome from "@pages/Languages/Python/PythonHome"
import PyIfElse from "@pages/Languages/Python/topics/PyIfElse";
import PyLoops from "@pages/Languages/Python/topics/PyLoops";
import PyArrays from "@pages/Languages/Python/topics/PyArrays";
import PyFunctions from "@pages/Languages/Python/topics/PyFunctions";
import PyExercise from "@/pages/Languages/Python/topics/PyExercise";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/python" element={<PythonHome/>} />
        <Route path="/pyIfElse" element={<PyIfElse/>} />
        <Route path="/pyLoops" element={<PyLoops/>} />
        <Route path="/pyArrays" element={<PyArrays/>} />
        <Route path="/pyFunctions" element={<PyFunctions/>} />
        <Route path="/pyExercise" element={<PyExercise/>} />
      </Routes>
    </BrowserRouter>
  );
}