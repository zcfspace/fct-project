import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';
import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner'

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
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const getOrders = async () => {
    try {
      const response = await fetch(`/api/order/get?status=${selectedStatus}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [selectedStatus]);

  const deleteOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/order/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOrders(orders.filter((order) => order.id !== id));
        toast.success('Pedido eliminado correctamente');
      }
    } catch (error) {
      toast.error('Error al eliminar el pedido');
    }
  };
  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/order/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        getOrders();
        toast.success('Estado del pedido actualizado correctamente');
      }
    } catch (error) {
      toast.error('Error al actualizar el estado del pedido');
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <Layout>
      <Toaster richColors closeButton position="top-right" />
      <div className='p-4'>
        <div className="mb-4">
          <label htmlFor="statusFilter">Filtrar por estado:</label>
          <select id="statusFilter" value={selectedStatus} onChange={handleStatusChange}>
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="procesando">Procesando</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              {/* <th>Fecha de creación</th> */}
              <th>Artículos del pedido</th>
              <th>Mesa</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                {/* <th>{order.createdAt}</th> */}
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
                <td>
                  {order.status === 'pendiente' && (
                    <button
                      className="text-green-500"
                      onClick={() => updateOrderStatus(order.id, 'procesando')}>
                      Procesar
                    </button>
                  )}

                  {order.status === 'procesando' && (
                    <button
                      className="text-green-500"
                      onClick={() => updateOrderStatus(order.id, 'completado')}>
                      Completar
                    </button>
                  )}

                  {order.status === 'completado' && (
                    <span>l</span>
                  )}
                </td>
                <td>
                  <button
                    className="text-red-500"
                    onClick={() => deleteOrder(order.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </Layout>
  );
}

export default withAdminAuth(OrderPage);


