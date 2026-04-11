import { useState, useEffect, useCallback, useRef } from "react";

const SSE_URL = "http://localhost:3001/events";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const eventSourceRef = useRef(undefined);

  useEffect(() => {
    function connect() {
      const es = new EventSource(SSE_URL);
      eventSourceRef.current = es;

      es.addEventListener("new-order", (event) => {
        const order = JSON.parse(event.data);
        const notification = {
          id: order.id,
          customer: order.customer,
          createdAt: order.createdAt,
        };

        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });

      es.onerror = () => {
        es.close();
        setTimeout(connect, 3000);
      };
    }

    connect();

    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  const markAllRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return { notifications, unreadCount, markAllRead };
}
