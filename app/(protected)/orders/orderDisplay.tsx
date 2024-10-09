"use client";
import { useEffect, useState } from "react";
import OrdersContainer from "./OrdersContainer";
import { useSession } from "next-auth/react";
import { Order } from "@prisma/client";

export default function OrderDisplay() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { data, status } = useSession();
  const userId = data?.user.id;

  useEffect(() => {
    if (status === "authenticated" && userId) {
      fetch(`/api/orders?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setOrders(data.body));
    }
  }, [status, userId]);

  return (
    <div className="mx-auto py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Your Orders</h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          View the details of your recent purchases.
        </p>
        {orders && orders.length > 0 &&
          orders.map((order) => (
            <OrdersContainer
              productName={order.id}
              price={order.pricePaid}
              orderStatus={order.Status}
              orderDate={order.createdAt}
            />
          ))}
      </div>
    </div>
  );
}