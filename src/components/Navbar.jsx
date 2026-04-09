import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-background px-6 py-3 flex gap-6">
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
    </nav>
  );
}
