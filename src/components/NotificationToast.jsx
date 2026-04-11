import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart, X } from "lucide-react";

export default function NotificationToast({ notifications }) {
  const [visibleToasts, setVisibleToasts] = useState([]);

  useEffect(() => {
    if (notifications.length === 0) return;

    const latest = notifications[0];
    const alreadyVisible = visibleToasts.some((t) => t.id === latest.id);
    if (alreadyVisible) return;

    // Use setTimeout with 0ms to defer state update and avoid cascading renders
    const addTimer = setTimeout(() => {
      setVisibleToasts((prev) => [latest, ...prev].slice(0, 5));
    }, 0);

    const removeTimer = setTimeout(() => {
      setVisibleToasts((prev) => prev.filter((t) => t.id !== latest.id));
    }, 4000);

    return () => {
      clearTimeout(addTimer);
      clearTimeout(removeTimer);
    };
  }, [notifications, visibleToasts]);

  const dismiss = (id) => {
    setVisibleToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (visibleToasts.length === 0) return undefined;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start gap-3 rounded-lg border bg-card p-4 shadow-lg",
            "animate-in slide-in-from-right-full fade-in duration-300",
          )}
        >
          <ShoppingCart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-card-foreground">
              New Order
            </p>
            <p className="text-sm text-muted-foreground truncate">
              New order from {toast.customer}
            </p>
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
