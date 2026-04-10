import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AllOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        console.log(data);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6 gap-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        All Orders
      </h1>

      {loading && <p className="text-muted-foreground">Loading orders...</p>}

      {error !== undefined && (
        <p className="text-destructive">Error: {error}</p>
      )}

      {!loading && !error && orders.length === 0 && (
        <p className="text-muted-foreground">No orders found.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">User Name</span>
                <span>{order.customer}</span>
                <span className="text-muted-foreground">Product</span>
                <span>{order?.items[0]?.product}</span>
                <span className="text-muted-foreground">Quantity</span>
                <span>{order?.items[0]?.quantity}</span>
                {order.createdAt && (
                  <>
                    <span className="text-muted-foreground">Timestamp</span>
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
