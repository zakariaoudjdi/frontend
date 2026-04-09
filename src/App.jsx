import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import OrderPage from "./pages/OrderPage";
import AllOrdersPage from "./pages/AllOrdersPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/orders" element={<AllOrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
