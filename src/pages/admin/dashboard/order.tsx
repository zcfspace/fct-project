import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';
import React, { useState, useEffect } from "react";
interface Order {
  id: string;
  table: string;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
}

interface OrderItem {
  id: string;
  orderId: string;
  foodId: string;
  quantity: number;
  food: {
    name: string;
  };
}

function OrderPage() {

  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    try {
      const response = await fetch(`/api/order/get`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <div className='p-4'>
        <table>
          <thead>
            <tr>
              <th>Fecha de creación</th>
              <th>Artículos del pedido</th>
              <th>Mesa</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <th>{order.createdAt}</th>
                <td>
                  <ul>
                    {order.orderItems.map(item => (
                      <li key={item.id}>
                        {item.food.name} - Cantidad: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.table}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </Layout>
  );
}

export default withAdminAuth(OrderPage);


