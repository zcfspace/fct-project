import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';
import React, { useState, useEffect, Fragment } from 'react';
import { Toaster, toast } from 'sonner'
import Link from 'next/link';
import { format } from "date-fns";
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
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
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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
      const response = await fetch(`/api/order/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
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

  const printQR = () => {
    window.print();
  };

  return (
    <Layout>
      <Toaster richColors closeButton position="top-right" />
      <div className='p-4'>
        <div className='flex'>
          <div className='mr-3'>
            <button className='rounded-md bg-green-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
              <Link href='/order' target='_blank'>
                Crear pedido
              </Link>
            </button>
          </div>
          <div className='mr-3'>
            <button
              type="button"
              onClick={openModal}
              className='rounded-md bg-green-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
              Mostrar QR
            </button>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Image
                        src="/img/vercelqr.png"
                        alt="imagen qr"
                        width={600}
                        height={600}
                      />
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={printQR}
                          className="mr-2 rounded-md bg-green-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          Imprimir
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <div>
            <select
              className='block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300'
              id="statusFilter" value={selectedStatus} onChange={handleStatusChange}>
              <option value="">Estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="procesando">Procesando</option>
              <option value="completado">Completado</option>
            </select>
          </div>
        </div>
        <div className="w-full relative lg:h-[77vh] overflow-y-scroll rounded-lg shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className='text-xs text-gray-700 uppercase bg-green-100'>
              <tr>
                <th className="px-6 py-3">Artículos del pedido</th>
                <th className="px-6 py-3">Fecha de creación</th>
                <th className="px-6 py-3">Mesa</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className='hover:bg-gray-50 hover:shadow-md  even:bg-green-100 odd:bg-white'>
                  <td className="px-6 py-4">
                    <ul>
                      {order.orderItems.map(item => (
                        <li key={item.id}>
                          {item.food.name} - Cantidad: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</td>
                  <td className="px-6 py-4">{order.table}</td>
                  <td className="px-6 py-4">
                    <span className={`capitalize px-3 py-2 inline-flex text-xs leading-5 font-bold rounded-full ${order.status === 'completado' ? 'bg-green-100 text-green-800' : order.status === 'pendiente' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.status === 'pendiente' && (
                      <button
                        className="text-green-500"
                        onClick={() => updateOrderStatus(order.id, 'procesando')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      </button>
                    )}
                    {order.status === 'procesando' && (
                      <button
                        className="text-green-500"
                        onClick={() => updateOrderStatus(order.id, 'completado')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                        </svg>
                      </button>
                    )}
                    <button
                      className="text-red-500 ml-4"
                      onClick={() => deleteOrder(order.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >
    </Layout>
  );
}

export default withAdminAuth(OrderPage);


