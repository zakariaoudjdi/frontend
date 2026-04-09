import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function OrderPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const order = {
      ...data,
    };
    await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 gap-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Make your order
      </h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Place an Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                className="px-4 py-6"
                placeholder="Enter your name"
                {...register("userName", { required: "User name is required" })}
              />
              {errors.userName && (
                <p className="text-sm text-destructive">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Input
                id="product"
                className="px-4 py-6"
                placeholder="Enter product name"
                {...register("product", { required: "Product is required" })}
              />
              {errors.product && (
                <p className="text-sm text-destructive">
                  {errors.product.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                className="px-4 py-6"
                placeholder="Enter quantity"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Quantity must be at least 1" },
                  valueAsNumber: true,
                })}
              />
              {errors.quantity && (
                <p className="text-sm text-destructive">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full py-6">
              Add Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
