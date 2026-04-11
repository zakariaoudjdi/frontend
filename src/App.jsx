import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotificationToast from "./components/NotificationToast";
import OrderPage from "./pages/OrderPage";
import AllOrdersPage from "./pages/AllOrdersPage";
import { useNotifications } from "./hooks/useNotifications";

function App() {
  const { notifications, unreadCount, markAllRead } = useNotifications();

  return (
    <BrowserRouter>
      <Navbar unreadCount={unreadCount} onClearNotifications={markAllRead} />
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/orders" element={<AllOrdersPage />} />
      </Routes>
      <NotificationToast notifications={notifications} />
    </BrowserRouter>
  );
}

export default App;
