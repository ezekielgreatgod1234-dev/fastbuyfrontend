import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import MainLayout from "./layout/MainLayout";
import VerifyPayment from "./pages/VerifyPayment";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/payment" element={<VerifyPayment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
