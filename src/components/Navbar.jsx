import { NavLink } from "react-router-dom";
import { Bell } from "lucide-react";

export default function Navbar({ unreadCount = 0, onClearNotifications }) {
  return (
    <nav className="w-full border-b bg-background px-6 py-3 flex items-center gap-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground transition-colors"
        }
      >
        Place Order
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          isActive
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground transition-colors"
        }
      >
        All Orders
      </NavLink>

      <button
        onClick={onClearNotifications}
        className="ml-auto relative text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>
    </nav>
  );
}
