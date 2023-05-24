import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
interface Order {
  id: string;
  table: string;
  status: string;
  createdAt: string;
}

function RecentOrders() {

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
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-y-scroll'>
      <h1 className='text-xl text-center font-bold text-green-500'>Comandas recientes</h1>
      <ul>
        {orders.map((order) => (
          <li
            key={order.id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 px-2 flex items-center justify-between'
          >
            <div className='p-4'>
              <p className='text-sm font-medium text-gray-900'>
                Mesa - {order.table}
              </p>
              <p className='text-sm text-gray-500 truncate'>
                {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
              </p>
            </div>
            <div>
              <p className={`capitalize px-3 py-2 inline-flex text-xs leading-5 font-bold rounded-full ${order.status === 'completado' ? 'bg-green-100 text-green-800' : order.status === 'pendiente' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {order.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
