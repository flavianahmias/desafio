import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./pages/main";
import { Register } from "./pages/register";
import { Login } from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dash" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
